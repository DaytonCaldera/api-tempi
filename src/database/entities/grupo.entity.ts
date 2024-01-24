import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Publicador } from './publicador.entity';

@Entity()
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Publicador, (publicador) => publicador.grupo)
  publicadores: Publicador[];
}
