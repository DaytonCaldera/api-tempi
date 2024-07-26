import { Conductor } from 'src/conductor/entities/conductor.entity';
import { ProgramaPredicacion } from 'src/programa_predicacion/entities/programa_predicacion.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity()
export class Modalidad {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  modalidad: string;
  @ManyToMany(() => Conductor)
  @JoinTable()
  conductor?: Conductor[];
  @OneToMany(() => ProgramaPredicacion, (programa) => programa.modalidad)
  programa?: ProgramaPredicacion[];
}
