import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { OrdemServicoService } from './ordem-servico.service';
import { CreateOrdemServicoDto } from './dto/create-ordem-servico.dto';
import { UpdateOrdemServicoDto } from './dto/update-ordem-servico.dto';
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
    @Body('status')
    status: 'aberto' | 'em andamento' | 'concluido' | 'cancelado'
  ) {
    return this.ordemService.updateStatus(+id, status);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateOrdemServicoDto) {
    return this.ordemService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.ordemService.remove(+id);
  }
}
