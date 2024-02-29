import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Periodo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  inicio?: Date;
  @Column()
  final?: Date;
}
