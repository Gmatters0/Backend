export class CreateMoradorDto {
  // Dados do Morador
  nome: string;
  sobrenome: string;
  cpf: string;
  telefone: string;

  // Dados para criar o Usuário
  email: string;
  senha: string;

  // Relacionamento
  unidadeId: number;
}
