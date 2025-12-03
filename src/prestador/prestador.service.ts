import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prestador } from './entities/prestador.entity';
import { CreatePrestadorDto } from './dto/create-prestador.dto';
import { UpdatePrestadorDto } from './dto/update-prestador.dto';

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

  async update(id: number, updatePrestadorDto: UpdatePrestadorDto) {
    const prestador = await this.prestadorRepository.preload({
      id,
      ...updatePrestadorDto,
    });
    if (!prestador) {
      throw new NotFoundException(`Prestador #${id} não encontrado`);
    }
    return this.prestadorRepository.save(prestador);
  }

  remove(id: number) {
    return this.prestadorRepository.delete(id);
  }
}
