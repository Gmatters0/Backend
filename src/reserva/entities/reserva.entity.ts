import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Morador } from 'src/morador/entities/morador.entity';
import { AreaComum } from 'src/area-comum/entities/area-comum.entity';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  data: string;

  @Column({ type: 'time' })
  horaInicio: string;

  @Column({ type: 'time' })
  horaFim: string;

  @CreateDateColumn()
  dataCriacao: Date;

  @ManyToOne(() => Morador, { eager: true })
  morador: Morador;

  @ManyToOne(() => AreaComum, { eager: true })
  areaComum: AreaComum;
}
