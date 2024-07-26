import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Puntos } from '../../puntos/entities/puntos.entity';
import { Conductor } from '../../conductor/entities/conductor.entity';
import { Territorio } from '../../territorio/entities/territorio.entity';
import { Fraccion } from '../../fraccion/entities/fraccion.entity';
import { Modalidad } from 'src/modalidad/entities/modalidad.entity';

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
  territorio?: Territorio[];
  @ManyToMany(() => Fraccion)
  @JoinTable()
  fraccion?: Fraccion[];
  @ManyToOne(() => Modalidad)
  modalidad: Modalidad;
}
