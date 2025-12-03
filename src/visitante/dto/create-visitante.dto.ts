import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateVisitanteDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNumber()
  @IsNotEmpty()
  unidadeId: number;

  @IsOptional()
  dataEntrada?: Date; // Opcional, pois pode usar a data atual por padrão
}
