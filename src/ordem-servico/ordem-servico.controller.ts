import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { OrdemServicoService } from './ordem-servico.service';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('ordens-servico')
export class OrdemServicoController {
  constructor(private readonly ordemService: OrdemServicoService) {}

  @Post()
  create(@Body() createDto: CreateOrdemServicoDto) {
    return this.ordemService.create(createDto);
  }

  @Get()
  findAll() {
    return this.ordemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordemService.findOne(+id);
  }

  @Patch(':id/status')
  @Roles('admin')
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'aberto' | 'em andamento' | 'fechado'
  ) {
    return this.ordemService.updateStatus(+id, status);
  }
}
