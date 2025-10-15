import { User } from '../../user/entities/user.entity';
import { Unidade } from '../../unidade/entities/unidade.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Morador {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sobrenome: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  telefone: string;

  @OneToOne(() => User, { cascade: true, eager: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Unidade, (unidade) => unidade.moradores, { eager: true })
  unidade: Unidade;
}
