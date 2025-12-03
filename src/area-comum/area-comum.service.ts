import { Injectable, OnModuleInit, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaComum } from './entities/area-comum.entity';
import { CreateAreaComumDto } from './dto/create-area-comum.dto';
import { UpdateAreaComumDto } from './dto/update-area-comum.dto';

@Injectable()
export class AreaComumService implements OnModuleInit {
  constructor(
    @InjectRepository(AreaComum)
    private areaRepository: Repository<AreaComum>
  ) {}

  async onModuleInit() {
    const count = await this.areaRepository.count();
    if (count === 0) {
      console.log('Populando áreas comuns...');
      const areas = [
        { nome: 'Churrasqueira' },
        { nome: 'Salão de Festas' },
        { nome: 'Piscina' },
      ];
      await this.areaRepository.save(areas);
    }
  }

  create(createAreaComumDto: CreateAreaComumDto) {
    const area = this.areaRepository.create(createAreaComumDto);
    return this.areaRepository.save(area);
  }

  findAll() {
    return this.areaRepository.find();
  }

  findOne(id: number) {
    return this.areaRepository.findOne({ where: { id } });
  }

  async update(id: number, updateAreaComumDto: UpdateAreaComumDto) {
    const area = await this.areaRepository.preload({
      id,
      ...updateAreaComumDto,
    });
    if (!area) throw new NotFoundException(`Área Comum #${id} não encontrada`);
    return this.areaRepository.save(area);
  }

  async remove(id: number) {
    const result = await this.areaRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Área Comum #${id} não encontrada`);
    }
  }
}
