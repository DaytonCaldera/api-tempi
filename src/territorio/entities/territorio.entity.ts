import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RegistroPredicacion } from '../../registro-predicacion/entities/registro_predicacion.entity';
import { Fraccion } from 'src/fraccion/entities/fraccion.entity';
import { Puntos } from 'src/puntos/entities/puntos.entity';

@Entity()
export class Territorio {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column({ nullable: true })
  mapa: string;
  @OneToOne(() => Fraccion)
  @JoinColumn()
  fraccion?: Fraccion;
  @OneToOne(() => RegistroPredicacion, (registro) => registro.territorio)
  registro?: RegistroPredicacion;
  @ManyToMany(() => Puntos)
  @JoinTable()
  puntos?: Puntos[];
}
