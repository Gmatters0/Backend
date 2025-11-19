import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reserva } from 'src/reserva/entities/reserva.entity';

@Entity()
export class AreaComum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => Reserva, (reserva) => reserva.areaComum)
  reservas: Reserva[];
}
