import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Publicador } from '../../publicador/entities/publicador.entity';

@Entity()
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Publicador, (publicador) => publicador.grupo)
  publicadores?: Publicador[];

  @OneToOne(() => Publicador, (encargado) => encargado.id, {
    nullable: true,
  })
  @JoinColumn()
  encargado?: Publicador;
  @OneToOne(() => Publicador, (auxiliar) => auxiliar.id, {
    nullable: true,
  })
  @JoinColumn()
  auxiliar?: Publicador;
}
