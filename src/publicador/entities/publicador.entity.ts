import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Grupo } from '../../grupo/entities/grupo.entity';
import { Conductor } from '../../conductor/entities/conductor.entity';

@Entity()
export class Publicador {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  apellido1: string;
  @ManyToOne(() => Grupo, (grupo) => grupo.publicadores)
  grupo: Grupo;
  @OneToOne(() => Conductor, (conductor) => conductor.publicador, {
    nullable: true,
  })
  conductor?: Conductor;
}
