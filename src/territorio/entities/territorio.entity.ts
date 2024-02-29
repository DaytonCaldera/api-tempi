import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RegistroPredicacion } from '../../registro-predicacion/entities/registro_predicacion.entity';

@Entity()
export class Territorio {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @OneToOne(() => RegistroPredicacion, (registro) => registro.territorio)
  registro?: RegistroPredicacion;
}
