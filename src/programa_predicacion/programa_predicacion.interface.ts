import { Conductor } from 'src/conductor/conductor.interface';
import { Fraccion } from 'src/fraccion/fraccion.interface';
import { Puntos } from 'src/puntos/puntos.interface';
import { Territorio } from 'src/territorio/territorio.interface';

export interface ProgramaPredicacion {
  id: number;
  fecha: Date;
  punto: Puntos;
  conductor: Conductor;
  territorio?: Territorio[];
  fraccion?: Fraccion[];
}
