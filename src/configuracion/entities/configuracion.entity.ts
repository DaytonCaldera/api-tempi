import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Configuracion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column({ type: 'simple-array' })
  dias: number[];

  @Column({ type: 'text' })
  hora: string;
}
