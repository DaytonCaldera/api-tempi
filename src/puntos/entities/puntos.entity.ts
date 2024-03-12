import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Dia } from '../../dia/entities/dia.entity';
import { Grupo } from '../../grupo/entities/grupo.entity';
import { Territorio } from 'src/territorio/entities/territorio.entity';

@Entity()
export class Puntos {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @ManyToMany(() => Dia)
  @JoinTable()
  dias: Dia[];
  @OneToOne(() => Grupo)
  @JoinColumn()
  grupo?: Grupo;
  @ManyToMany(() => Territorio)
  @JoinTable()
  territorios?: Territorio[];
}
