import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvisoService } from './aviso.service';
import { AvisoController } from './aviso.controller';
import { Aviso } from './entities/aviso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Aviso])],
  controllers: [AvisoController],
  providers: [AvisoService],
})
export class AvisoModule {}
