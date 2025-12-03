import { Unidade } from '../../unidade/entities/unidade.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Visitante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @CreateDateColumn()
  dataEntrada: Date;

  @Column({ default: 'ativo' }) // 'ativo' | 'saiu'
  status: string;

  @ManyToOne(() => Unidade, (unidade) => unidade.visitantes)
  @JoinColumn({ name: 'unidadeId' })
  unidade: Unidade;

  @Column({ name: 'unidadeId' })
  unidadeId: number;
}
