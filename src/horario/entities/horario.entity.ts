import { Dia } from 'src/dia/entities/dia.entity';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Horario {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToMany(() => Dia)
  @JoinTable()
  dia: Dia;
  hora: Date;
}
