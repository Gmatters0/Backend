import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visitante } from './entities/visitante.entity';
import { CreateVisitanteDto } from './dto/create-visitante.dto';
import { UpdateVisitanteDto } from './dto/update-visitante.dto';
import { UnidadeService } from 'src/unidade/unidade.service';

@Injectable()
export class VisitanteService {
  constructor(
    @InjectRepository(Visitante)
    private visitanteRepository: Repository<Visitante>,
    private unidadeService: UnidadeService
  ) {}

  async create(createVisitanteDto: CreateVisitanteDto): Promise<Visitante> {
    const { unidadeId } = createVisitanteDto;

    // Verifica se a unidade existe
    const unidade = await this.unidadeService.findOne(unidadeId);
    if (!unidade) {
      throw new BadRequestException(
        `Unidade com ID #${unidadeId} não encontrada.`
      );
    }

    const visitante = this.visitanteRepository.create({
      ...createVisitanteDto,
      unidade,
    });

    return this.visitanteRepository.save(visitante);
  }

  async findAll() {
    return this.visitanteRepository.find({
      relations: ['unidade'],
      order: {
        dataEntrada: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const visitante = await this.visitanteRepository.findOne({
      where: { id },
      relations: ['unidade'],
    });

    if (!visitante) {
      throw new NotFoundException(`Visitante com ID #${id} não encontrado.`);
    }

    return visitante;
  }

  async update(id: number, updateVisitanteDto: UpdateVisitanteDto) {
    const visitante = await this.visitanteRepository.preload({
      id,
      ...updateVisitanteDto,
    });

    if (!visitante) {
      throw new NotFoundException(`Visitante com ID #${id} não encontrado.`);
    }

    return this.visitanteRepository.save(visitante);
  }

  // Método específico para registrar saída
  async registrarSaida(id: number) {
    return this.update(id, { status: 'saiu' });
  }

  async remove(id: number) {
    const visitante = await this.findOne(id);
    return this.visitanteRepository.remove(visitante);
  }
}
