import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dia } from './dia.entity';
import { Grupo } from './grupo.entity';

@Entity()
export class Puntos {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @ManyToMany(() => Dia)
  @JoinTable()
  dias: Dia[];
  @OneToOne(() => Grupo)
  grupo?: Grupo;
}
