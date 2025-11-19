import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestador } from './entities/prestador.entity';
import { CreatePrestadorDto } from './dto/create-prestador.dto';

@Injectable()
export class PrestadorService {
  constructor(
    @InjectRepository(Prestador)
    private prestadorRepository: Repository<Prestador>
  ) {}

  create(createPrestadorDto: CreatePrestadorDto) {
    const prestador = this.prestadorRepository.create(createPrestadorDto);
    return this.prestadorRepository.save(prestador);
  }

  findAll() {
    return this.prestadorRepository.find();
  }

  findOne(id: number) {
    return this.prestadorRepository.findOne({ where: { id } });
  }

  remove(id: number) {
    return this.prestadorRepository.delete(id);
  }
}
