import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrestadorService } from './prestador.service';
import { PrestadorController } from './prestador.controller';
import { Prestador } from './entities/prestador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prestador])],
  controllers: [PrestadorController],
  providers: [PrestadorService],
})
export class PrestadorModule {}
