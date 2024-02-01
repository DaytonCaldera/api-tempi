import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Puntos } from './puntos.entity';
import { Conductor } from './conductor.entity';
import { Territorio } from './territorio.entity';
import { Fraccion } from './fraccion.entity';

@Entity()
export class ProgramaPredicacion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fecha: Date;
  @ManyToOne(() => Puntos)
  punto: Puntos;
  @ManyToOne(() => Conductor)
  conductor: Conductor;
  @ManyToMany(() => Territorio)
  @JoinTable()
  territorio: Territorio[];
  @ManyToMany(() => Fraccion)
  @JoinTable()
  fraccion: Fraccion[];
}
