import { PartialType } from '@nestjs/mapped-types';
import { CreateVisitanteDto } from './create-visitante.dto';
import { IsString, IsOptional } from 'class-validator';

export class UpdateVisitanteDto extends PartialType(CreateVisitanteDto) {
  @IsString()
  @IsOptional()
  status?: string; // Para atualizar para 'saiu'
}
