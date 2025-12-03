import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AvisoService } from './aviso.service';
import { CreateAvisoDto } from './dto/create-aviso.dto';
import { UpdateAvisoDto } from './dto/update-aviso.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('avisos')
export class AvisoController {
  constructor(private readonly avisoService: AvisoService) {}

  @Post()
  @Roles('admin') // Apenas Admin cria
  create(@Body() createAvisoDto: CreateAvisoDto) {
    return this.avisoService.create(createAvisoDto);
  }

  @Get()
  // Sem @Roles, acessível a todos autenticados
  findAll() {
    return this.avisoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.avisoService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin') // Apenas Admin edita
  update(@Param('id') id: string, @Body() updateAvisoDto: UpdateAvisoDto) {
    return this.avisoService.update(+id, updateAvisoDto);
  }

  @Delete(':id')
  @Roles('admin') // Apenas Admin remove
  remove(@Param('id') id: string) {
    return this.avisoService.remove(+id);
  }
}
