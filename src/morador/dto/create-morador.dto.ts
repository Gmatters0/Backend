/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMoradorDto {
  // Dados do Morador
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  sobrenome: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(11)
  cpf: string;
  telefone: string;

  // Dados para criar o Usuário
  email: string;
  senha: string;

  // Relacionamento
  unidadeId: number;
}
