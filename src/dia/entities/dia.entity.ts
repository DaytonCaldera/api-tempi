import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Conductor } from '../../conductor/entities/conductor.entity';

@Entity()
export class Dia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Conductor, {
    nullable: true,
  })
  conductores: Conductor[];
}
