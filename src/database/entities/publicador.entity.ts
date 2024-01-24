import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Grupo } from './grupo.entity';
import { Conductor } from './conductor.entity';

@Entity()
export class Publicador {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  id_grupo: number;
  @Column()
  nombre: string;
  @Column()
  apellido1: string;
  @ManyToOne(() => Grupo, (grupo) => grupo.publicadores)
  grupo: Grupo;
  @OneToOne(() => Conductor, (conductor) => conductor.publicador)
  conductor: Conductor;
}
