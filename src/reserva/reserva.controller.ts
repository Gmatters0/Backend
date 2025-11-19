import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Controller('reservas')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  findAll(@Query('data') data?: string) {
    if (data) {
      return this.reservaService.findByDate(data);
    }
    return this.reservaService.findAll();
  }
}
