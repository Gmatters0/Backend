import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UnidadeService } from './unidade.service';
import { CreateUnidadeDto } from './dto/create-unidade.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('unidades')
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadeService) {}

  @Post()
  @Roles('admin')
  create(@Body() createUnidadeDto: CreateUnidadeDto) {
    return this.unidadeService.create(createUnidadeDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.unidadeService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: number) {
    return this.unidadeService.findOne(id);
  }
}
