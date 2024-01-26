import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Publicador } from './publicador.entity';
import { Dia } from './dia.entity';
import { RegistroPredicacion } from './registro_predicacion.entity';

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
  @ManyToMany(() => RegistroPredicacion)
  @JoinTable()
  registro?: RegistroPredicacion[];
}
