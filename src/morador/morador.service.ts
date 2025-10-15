// src/morador/morador.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Morador } from './entities/morador.entity';
import { CreateMoradorDto } from './dto/create-morador.dto';
import { UserService } from 'src/user/user.service';
import { UnidadeService } from 'src/unidade/unidade.service';
import { User } from 'src/user/entities/user.entity';

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
      cpf: cpf, // <-- AQUI ESTÁ A CORREÇÃO!
      user: newUser,
      unidade: unidade,
    });

    // 5. Salva o morador (e o usuário, graças ao cascade)
    return this.moradorRepository.save(newMorador);
  }

  findAll(): Promise<Morador[]> {
    return this.moradorRepository.find();
  }
}
