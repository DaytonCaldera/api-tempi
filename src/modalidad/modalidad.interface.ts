import { Conductor } from 'src/conductor/conductor.interface';
import { ProgramaPredicacion } from 'src/programa_predicacion/programa_predicacion.interface';

export class Modalidad {
  id: number;
  modalidad: string;
  conductor?: Conductor[];
  programa?: ProgramaPredicacion[];
}
