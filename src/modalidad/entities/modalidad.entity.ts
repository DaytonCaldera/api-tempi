import { ProgramaPredicacion } from 'src/programa_predicacion/entities/programa_predicacion.entity';
import { Publicador } from 'src/publicador/entities/publicador.entity';
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
  @ManyToMany(() => Publicador)
  @JoinTable()
  conductor?: Publicador[];
  @OneToMany(() => ProgramaPredicacion, (programa) => programa.modalidad)
  programa?: ProgramaPredicacion[];
}
