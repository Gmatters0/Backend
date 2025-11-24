import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdemServico } from './entities/ordem-servico.entity';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';

@Injectable()
export class OrdemServicoService {
  constructor(
    @InjectRepository(OrdemServico)
    private ordemRepository: Repository<OrdemServico>
  ) {}

  create(createDto: CreateOrdemServicoDto) {
    const novaOrdem = this.ordemRepository.create({
      ...createDto,
      status: 'aberto',
      prestador: { id: createDto.prestadorId },
    });
    return this.ordemRepository.save(novaOrdem);
  }

  findAll() {
    return this.ordemRepository.find({
      order: { dataCriacao: 'DESC' },
      relations: ['prestador'],
    });
  }

  findOne(id: number) {
    return this.ordemRepository.findOne({
      where: { id },
      relations: ['prestador'],
    });
  }

  async updateStatus(
    id: number,
    status: 'aberto' | 'em andamento' | 'fechado'
  ) {
    return this.ordemRepository.update(id, { status });
  }
}
