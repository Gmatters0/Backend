import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisitanteService } from './visitante.service';
import { VisitanteController } from './visitante.controller';
import { Visitante } from './entities/visitante.entity';
import { UnidadeModule } from 'src/unidade/unidade.module';

@Module({
  imports: [TypeOrmModule.forFeature([Visitante]), UnidadeModule],
  controllers: [VisitanteController],
  providers: [VisitanteService],
})
export class VisitanteModule {}
