import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Prestador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  documento: string; // Pode ser CPF ou CNPJ

  @Column()
  telefone: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  especialidade: string; // Ex: "Eletricista", "Encanador", "Geral"

  @Column({ nullable: true })
  empresa: string; // Caso seja uma empresa terceirizada
}
