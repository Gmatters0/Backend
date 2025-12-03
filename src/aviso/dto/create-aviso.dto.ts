import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';

export enum AvisoFlag {
  INFORMATIVO = 'Informativo',
  URGENTE = 'Urgente',
  IMPORTANTE = 'Importante',
  MANUTENCAO = 'Manutenção',
}

export class CreateAvisoDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsDateString()
  @IsOptional()
  data?: Date; // Se não enviar, o banco usa a data atual

  @IsEnum(AvisoFlag, {
    message:
      'Flag inválida. Use: Informativo, Urgente, Importante ou Manutenção',
  })
  flag: AvisoFlag;
}
