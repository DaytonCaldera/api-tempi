import { Grupo } from 'src/grupo/entities/grupo.entity';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Congregacion {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @OneToMany(() => Grupo, (grupo) => grupo.id)
  grupos: Grupo[];
  @OneToMany(() => Publicador, (publicador) => publicador.id)
  publicadores: Publicador[];
}
