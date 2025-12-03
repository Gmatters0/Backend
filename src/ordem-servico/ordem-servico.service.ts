/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdemServico } from './entities/ordem-servico.entity';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto';

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

  async findOne(id: number) {
    const ordem = await this.ordemRepository.findOne({
      where: { id },
      relations: ['prestador'],
    });

    if (!ordem) {
      throw new NotFoundException(`Ordem de Serviço #${id} não encontrada.`);
    }

    return ordem;
  }

  async updateStatus(
    id: number,
    status: 'aberto' | 'em andamento' | 'concluido' | 'cancelado'
  ) {
    const ordem = await this.findOne(id);
    ordem.status = status;
    return this.ordemRepository.save(ordem);
  }

  async update(id: number, updateOrdemDto: UpdateOrdemServicoDto) {
    const { prestadorId, ...dados } = updateOrdemDto;

    const updateData: any = { ...dados };
    if (prestadorId) {
      updateData.prestador = { id: prestadorId };
    }

    const ordem = await this.ordemRepository.preload({
      id,
      ...updateData,
    });

    if (!ordem) throw new NotFoundException(`Ordem #${id} não encontrada`);
    return this.ordemRepository.save(ordem);
  }

  async remove(id: number) {
    const result = await this.ordemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Ordem #${id} não encontrada`);
    }
  }
}
