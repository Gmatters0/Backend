import { Controller, Get, Post, Body } from '@nestjs/common';
import { MoradorService } from './morador.service';
import { CreateMoradorDto } from './dto/create-morador.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('moradores')
export class MoradorController {
  constructor(private readonly moradorService: MoradorService) {}

  @Post()
  @Roles('admin') // Apenas administradores podem cadastrar
  create(@Body() createMoradorDto: CreateMoradorDto) {
    return this.moradorService.create(createMoradorDto);
  }

  @Get()
  @Roles('admin') // Apenas administradores podem ver todos os moradores
  findAll() {
    return this.moradorService.findAll();
  }
}
