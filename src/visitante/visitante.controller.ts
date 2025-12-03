import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VisitanteService } from './visitante.service';
import { CreateVisitanteDto } from './dto/create-visitante.dto';
import { UpdateVisitanteDto } from './dto/update-visitante.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('visitantes')
export class VisitanteController {
  constructor(private readonly visitanteService: VisitanteService) {}

  @Post()
  @Roles('admin') // Ajuste as roles conforme necessário (ex: porteiro)
  create(@Body() createVisitanteDto: CreateVisitanteDto) {
    return this.visitanteService.create(createVisitanteDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.visitanteService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.visitanteService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateVisitanteDto: UpdateVisitanteDto
  ) {
    return this.visitanteService.update(+id, updateVisitanteDto);
  }

  @Patch(':id/saida')
  @Roles('admin')
  registrarSaida(@Param('id') id: string) {
    return this.visitanteService.registrarSaida(+id);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.visitanteService.remove(+id);
  }
}
