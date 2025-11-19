import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Morador } from './entities/morador.entity';
import { CreateMoradorDto } from './dto/create-morador.dto';
import { UserService } from 'src/user/user.service';
import { UnidadeService } from 'src/unidade/unidade.service';
import { User } from 'src/user/entities/user.entity';
import { UpdateMoradorDto } from './dto/update-morador.dto';

@Injectable()
export class MoradorService {
  constructor(
    @InjectRepository(Morador)
    private moradorRepository: Repository<Morador>,
    private userService: UserService,
    private unidadeService: UnidadeService
  ) {}

  async create(createMoradorDto: CreateMoradorDto): Promise<Morador> {
    const { email, senha, unidadeId, cpf, ...moradorData } = createMoradorDto;

    // 1. Verifica se a unidade existe
    const unidade = await this.unidadeService.findOne(unidadeId);
    if (!unidade) {
      throw new BadRequestException(
        `Unidade com ID #${unidadeId} não encontrada.`
      );
    }

    // 2. Verifica se o CPF ou Email já existem
    const moradorExists = await this.moradorRepository.findOne({
      where: { cpf },
    });
    if (moradorExists) {
      throw new BadRequestException(`Morador com CPF ${cpf} já cadastrado.`);
    }
    const userExists = await this.userService.findByEmail(email);
    if (userExists) {
      throw new BadRequestException(
        `Usuário com e-mail ${email} já cadastrado.`
      );
    }

    // 3. Cria a entidade User
    const newUser = new User();
    newUser.email = email;
    newUser.password = senha;
    newUser.nome = moradorData.nome;
    newUser.role = 'morador';

    // 4. Cria a entidade Morador e associa o usuário e a unidade
    const newMorador = this.moradorRepository.create({
      ...moradorData,
      cpf: cpf,
      user: newUser,
      unidade: unidade,
    });

    return this.moradorRepository.save(newMorador);
  }

  async findAll() {
    const moradores = await this.moradorRepository.find({
      relations: ['unidade'],
      order: {
        id: 'desc',
      },
    });

    if (moradores.length === 0) {
      throw new NotFoundException();
    }

    return moradores;
  }

  async update(id: number, updateMoradorDto: UpdateMoradorDto) {
    const partialUpdateMoradorDto = {
      ...updateMoradorDto,
    };
    const morador = await this.moradorRepository.preload({
      id,
      ...partialUpdateMoradorDto,
    });

    if (!morador) throw new NotFoundException();

    return this.moradorRepository.save(morador);
  }

  async remove(id: number) {
    const morador = await this.moradorRepository.findOneBy({ id });

    if (!morador) {
      throw new NotFoundException();
    }

    return this.moradorRepository.remove(morador);
  }
}
