import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Prestador } from 'src/prestador/entities/prestador.entity';

@Entity()
export class OrdemServico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  local: string;

  @Column({ default: 'baixa' })
  prioridade: 'baixa' | 'media' | 'alta';

  @Column({ default: 'aberto' })
  status: 'aberto' | 'em andamento' | 'fechado';

  @ManyToOne(() => Prestador, { eager: true })
  prestador: Prestador;

  @CreateDateColumn()
  dataCriacao: Date;
}
