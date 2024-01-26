import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conductor } from './conductor.entity';
import { Territorio } from './territorio.entity';

@Entity()
export class RegistroPredicacion {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Territorio, (territorio) => territorio.registro)
  @JoinTable()
  territorio: Territorio;
  @Column()
  inicio: Date;
  @Column({ nullable: true })
  final?: Date;
  @Column({ nullable: true })
  programado?: Date;
  @Column({ nullable: true })
  dias?: number;
  @Column({ nullable: true })
  periodo?: number;
  @ManyToMany(() => Conductor)
  @JoinTable()
  asignados: Conductor[];
}
