import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Grupo } from '../../grupo/entities/grupo.entity';
import { Congregacion } from 'src/congregacion/entities/congregacion.entity';
import { Tarea } from 'src/tareas/entities/tarea.entity';
import { Dia } from 'src/dia/entities/dia.entity';
import { Modalidad } from 'src/modalidad/entities/modalidad.entity';
import { RegistroPredicacion } from 'src/registro-predicacion/entities/registro_predicacion.entity';

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

  @ManyToMany(() => Tarea)
  @JoinTable()
  tareas?: Tarea[];
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

  @ManyToOne(() => Congregacion)
  congregacion: Congregacion;

  @ManyToMany(() => Dia)
  @JoinTable()
  dias?: Dia[];

  @ManyToMany(() => Modalidad)
  @JoinTable()
  modalidades?: Modalidad[];

  @ManyToMany(() => RegistroPredicacion, {
    cascade: true, // or specify the cascade options that suit your use case
  })
  @JoinTable()
  registro?: RegistroPredicacion[];
}
