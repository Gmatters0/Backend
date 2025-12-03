import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAreaComumDto {
  @IsString()
  @IsNotEmpty()
  nome: string;
}
