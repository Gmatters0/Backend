import { Morador } from '../../morador/entities/morador.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Unidade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bloco: string;

  @Column()
  apartamento: string;

  @OneToMany(() => Morador, (morador) => morador.unidade)
  moradores: Morador[];
}
