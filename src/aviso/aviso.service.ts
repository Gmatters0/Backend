import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aviso } from './entities/aviso.entity';
import { CreateAvisoDto } from './dto/create-aviso.dto';
import { UpdateAvisoDto } from './dto/update-aviso.dto';

@Injectable()
export class AvisoService {
  constructor(
    @InjectRepository(Aviso)
    private avisoRepository: Repository<Aviso>
  ) {}

  create(createAvisoDto: CreateAvisoDto) {
    const aviso = this.avisoRepository.create(createAvisoDto);
    return this.avisoRepository.save(aviso);
  }

  findAll() {
    return this.avisoRepository.find({
      order: {
        data: 'DESC', // Ordena do mais recente para o mais antigo
      },
    });
  }

  async findOne(id: number) {
    const aviso = await this.avisoRepository.findOneBy({ id });
    if (!aviso) {
      throw new NotFoundException(`Aviso com ID #${id} não encontrado.`);
    }
    return aviso;
  }

  async update(id: number, updateAvisoDto: UpdateAvisoDto) {
    const aviso = await this.avisoRepository.preload({
      id,
      ...updateAvisoDto,
    });

    if (!aviso) {
      throw new NotFoundException(`Aviso com ID #${id} não encontrado.`);
    }

    return this.avisoRepository.save(aviso);
  }

  async remove(id: number) {
    const aviso = await this.findOne(id);
    return this.avisoRepository.remove(aviso);
  }
}
