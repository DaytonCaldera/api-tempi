import { Publicador } from 'src/publicador/entities/publicador.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tarea {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @ManyToMany(() => Publicador, { nullable: true })
  publicadores?: Publicador[];
}
