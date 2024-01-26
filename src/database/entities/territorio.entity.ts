import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RegistroPredicacion } from './registro_predicacion.entity';

@Entity()
export class Territorio {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @OneToMany(() => RegistroPredicacion, (registro) => registro.territorio)
  registro?: RegistroPredicacion;
}
