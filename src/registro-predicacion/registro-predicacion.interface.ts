import { Conductor } from 'src/conductor/conductor.interface';
import { Periodo } from 'src/periodo/periodo.interface';
import { Territorio } from 'src/territorio/territorio.interface';

export interface RegistroPredicacion {
  id: number;
  territorio: Territorio;
  inicio: Date;
  programado?: Date;
  final?: Date;
  dias?: number;
  asignados: Conductor[];
  periodo?: Periodo;
}
