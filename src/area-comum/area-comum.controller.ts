import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { AreaComumService } from './area-comum.service';
import { CreateAreaComumDto } from './dto/create-area-comum.dto';
import { UpdateAreaComumDto } from './dto/update-area-comum.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('areas-comuns')
export class AreaComumController {
  constructor(private readonly areaService: AreaComumService) {}

  @Post()
  @Roles('admin')
  create(@Body() createAreaComumDto: CreateAreaComumDto) {
    return this.areaService.create(createAreaComumDto);
  }

  @Get()
  findAll() {
    return this.areaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.areaService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateAreaComumDto: UpdateAreaComumDto
  ) {
    return this.areaService.update(+id, updateAreaComumDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.areaService.remove(+id);
  }
}
