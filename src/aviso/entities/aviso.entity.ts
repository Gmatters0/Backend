import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Aviso {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column('text')
  descricao: string;

  // Pode ser preenchida manualmente ou gerar automático
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @Column()
  flag: string; // Ex: 'Informativo', 'Urgente', 'Importante', 'Manutenção'
}
