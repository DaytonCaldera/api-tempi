import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Publicador } from 'src/publicador/entities/publicador.entity';

@Entity()
export class Dia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Publicador, {
    nullable: true,
  })
  conductores: Publicador[];
}
