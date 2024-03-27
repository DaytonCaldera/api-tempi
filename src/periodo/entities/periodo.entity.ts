import { RegistroPredicacion } from 'src/registro-predicacion/entities/registro_predicacion.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Periodo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  inicio?: Date;
  @Column({ nullable: true })
  final?: Date;
  @OneToMany(() => RegistroPredicacion, (registro) => registro.periodo)
  @JoinColumn()
  registros: RegistroPredicacion[];
}
