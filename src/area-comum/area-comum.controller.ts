import { Controller, Get, Param } from '@nestjs/common';
import { AreaComumService } from './area-comum.service';

@Controller('areas-comuns')
export class AreaComumController {
  constructor(private readonly areaService: AreaComumService) {}

  @Get()
  findAll() {
    return this.areaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaService.findOne(+id);
  }
}
