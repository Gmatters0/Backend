import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AreaComum } from './entities/area-comum.entity';

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

  findAll() {
    return this.areaRepository.find();
  }

  findOne(id: number) {
    return this.areaRepository.findOne({ where: { id } });
  }
}
