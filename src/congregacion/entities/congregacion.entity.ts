import { Grupo } from 'src/grupo/entities/grupo.entity';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { Puntos } from 'src/puntos/entities/puntos.entity';
import { Territorio } from 'src/territorio/entities/territorio.entity';
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

  @OneToMany(() => Territorio, (territorio) => territorio.id)
  territorios: Territorio[];
  @OneToMany(() => Puntos, (punto) => punto.id)
  puntos: Puntos[];
}
