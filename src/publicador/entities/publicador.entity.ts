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
  // Add the new field here
  @Column({ nullable: true })
  nombreCompleto?: string;

  // A constructor to set default values for nombreCompleto
  constructor(nombre: string, apellido1: string) {
    this.nombre = nombre;
    this.apellido1 = apellido1;
    // Set nombreCompleto by concatenating nombre and apellido1
    this.nombreCompleto = `${nombre} ${apellido1}`;
  }
  //SQL: UPDATE publicador SET nombreCompleto = CONCAT(nombre,' ',apellido1);
}
