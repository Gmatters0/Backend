import { Morador } from '../../morador/entities/morador.entity';
import { Visitante } from '../../visitante/entities/visitante.entity'; // Importar Visitante
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

  // Adicionar este relacionamento
  @OneToMany(() => Visitante, (visitante) => visitante.unidade)
  visitantes: Visitante[];
}
