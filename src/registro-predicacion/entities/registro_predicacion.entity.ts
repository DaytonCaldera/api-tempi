import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conductor } from '../../conductor/entities/conductor.entity';
import { Territorio } from '../../territorio/entities/territorio.entity';
import { Periodo } from 'src/periodo/entities/periodo.entity';

@Entity()
export class RegistroPredicacion {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Territorio, (territorio) => territorio.registro)
  @JoinColumn()
  territorio: Territorio;
  @Column()
  inicio: Date;
  @Column({ nullable: true })
  final?: Date;
  @Column({ nullable: true })
  programado?: Date;
  @Column({ nullable: true })
  dias?: number;
  @ManyToOne(() => Periodo)
  @JoinColumn()
  periodo?: Periodo;
  @ManyToMany(() => Conductor, (conductor) => conductor.registro, {
    eager: true,
  })
  @JoinTable()
  asignados: Conductor[];
}
