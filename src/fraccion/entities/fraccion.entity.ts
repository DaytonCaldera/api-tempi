import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Territorio } from '../../territorio/entities/territorio.entity';

@Entity()
export class Fraccion {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => Territorio)
  @JoinColumn()
  territorio: Territorio;
  @Column()
  iniciado: Date;
  @Column({ nullable: true })
  programado?: Date;
  @Column({ nullable: true })
  notas?: string;
  @Column({ nullable: true })
  mapa?: string;
}
