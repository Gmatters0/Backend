import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unidade } from './entities/unidade.entity';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { UpdateUnidadeDto } from './dto/update-unidade.dto';

@Injectable()
export class UnidadeService {
  constructor(
    @InjectRepository(Unidade)
    private unidadeRepository: Repository<Unidade>
  ) {}

  create(createUnidadeDto: CreateUnidadeDto) {
    return this.unidadeRepository.save(createUnidadeDto);
  }

  findAll() {
    return this.unidadeRepository.find({
      relations: ['moradores'],
    });
  }

  findOne(id: number) {
    return this.unidadeRepository.findOneBy({ id });
  }

  async update(id: number, updateUnidadeDto: UpdateUnidadeDto) {
    const unidade = await this.unidadeRepository.preload({
      id,
      ...updateUnidadeDto,
    });
    if (!unidade) {
      throw new NotFoundException(`Unidade #${id} não encontrada`);
    }
    return this.unidadeRepository.save(unidade);
  }

  async remove(id: number) {
    const unidade = await this.findOne(id);
    if (!unidade) {
      throw new NotFoundException(`Unidade #${id} não encontrada`);
    }
    return this.unidadeRepository.remove(unidade);
  }
}
