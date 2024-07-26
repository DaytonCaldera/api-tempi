import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Publicador } from '../../publicador/entities/publicador.entity';
import { Dia } from '../../dia/entities/dia.entity';
import { RegistroPredicacion } from '../../registro-predicacion/entities/registro_predicacion.entity';
import { Modalidad } from 'src/modalidad/entities/modalidad.entity';
import { ProgramaPredicacion } from 'src/programa_predicacion/entities/programa_predicacion.entity';

@Entity()
export class Conductor {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Publicador, (publicador) => publicador.conductor, {
    cascade: true, // or specify the cascade options that suit your use case
  })
  @JoinColumn()
  publicador: Publicador;
  @ManyToMany(() => Dia)
  @JoinTable()
  dias: Dia[];
  @ManyToMany(() => RegistroPredicacion, {
    cascade: true, // or specify the cascade options that suit your use case
  })
  @JoinTable()
  registro?: RegistroPredicacion[];
  @ManyToMany(() => Modalidad)
  @JoinTable()
  modalidades?: Modalidad[];
  @OneToMany(() => ProgramaPredicacion, (programa) => programa.conductor)
  programas?: ProgramaPredicacion[];
}
