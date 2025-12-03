import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { PrestadorService } from './prestador.service';
import { CreatePrestadorDto } from './dto/create-prestador.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdatePrestadorDto } from './dto/update-prestador.dto';

@Controller('prestadores')
export class PrestadorController {
  constructor(private readonly prestadorService: PrestadorService) {}

  @Post()
  @Roles('admin')
  create(@Body() createPrestadorDto: CreatePrestadorDto) {
    return this.prestadorService.create(createPrestadorDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.prestadorService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.prestadorService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updatePrestadorDto: UpdatePrestadorDto
  ) {
    return this.prestadorService.update(+id, updatePrestadorDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.prestadorService.remove(+id);
  }
}
