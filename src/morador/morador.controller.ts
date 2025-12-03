import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { MoradorService } from './morador.service';
import { CreateMoradorDto } from './dto/create-morador.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateMoradorDto } from './dto/update-morador.dto';

@Controller('moradores')
export class MoradorController {
  constructor(private readonly moradorService: MoradorService) {}

  @Post()
  @Roles('admin')
  create(@Body() createMoradorDto: CreateMoradorDto) {
    return this.moradorService.create(createMoradorDto);
  }

  @Get()
  @Roles('admin')
  findAll() {
    return this.moradorService.findAll();
  }

  @Get(':id')
  @Roles('admin')
  findOne(@Param('id') id: string) {
    return this.moradorService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateMoradorDto: UpdateMoradorDto) {
    return this.moradorService.update(+id, updateMoradorDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.moradorService.remove(+id);
  }
}
