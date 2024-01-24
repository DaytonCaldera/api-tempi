import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Territorio {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
}
