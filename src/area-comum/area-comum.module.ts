import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaComumService } from './area-comum.service';
import { AreaComumController } from './area-comum.controller';
import { AreaComum } from './entities/area-comum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaComum])],
  controllers: [AreaComumController],
  providers: [AreaComumService],
  exports: [AreaComumService],
})
export class AreaComumModule {}
