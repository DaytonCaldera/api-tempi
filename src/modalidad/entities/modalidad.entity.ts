import { Conductor } from 'src/conductor/entities/conductor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Modalidad {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  modalidad: string;
  @ManyToMany(() => Conductor)
  @JoinTable()
  conductor?: Conductor[];
}
