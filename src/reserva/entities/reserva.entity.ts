import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Morador } from 'src/morador/entities/morador.entity';
import { AreaComum } from 'src/area-comum/entities/area-comum.entity';

@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  data: string; // YYYY-MM-DD

  @Column({ type: 'time' })
  horaInicio: string; // HH:mm:ss

  @Column({ type: 'time' })
  horaFim: string; // HH:mm:ss

  @ManyToOne(() => Morador, { eager: true }) // Carrega o morador junto automaticamente
  morador: Morador;

  @ManyToOne(() => AreaComum, { eager: true }) // Carrega a área junto automaticamente
  areaComum: AreaComum;
}
