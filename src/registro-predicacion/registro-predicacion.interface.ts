import { Periodo } from 'src/periodo/periodo.interface';
import { Publicador } from 'src/publicador/entities/publicador.entity';
import { Territorio } from 'src/territorio/territorio.interface';

export interface RegistroPredicacion {
  id: number;
  territorio: Territorio;
  inicio: Date;
  programado?: Date;
  final?: Date;
  dias?: number;
  asignados: Publicador[];
  periodo?: Periodo;
}
