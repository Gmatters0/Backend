import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Unidade } from './entities/unidade.entity';
import { CreateUnidadeDto } from './dto/create-unidade.dto';

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
    return this.unidadeRepository.find();
  }

  findOne(id: number) {
    return this.unidadeRepository.findOneBy({ id });
  }
}
