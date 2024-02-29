import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Conductor } from '../../conductor/entities/conductor.entity';
import { Territorio } from '../../territorio/entities/territorio.entity';

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
  @Column({ nullable: true })
  periodo?: number;
  @ManyToMany(() => Conductor, { cascade: ['insert'] })
  @JoinTable()
  asignados: Conductor[];
}
