import { ProgramaPredicacion } from 'src/programa_predicacion/programa_predicacion.interface';
import { Publicador } from 'src/publicador/entities/publicador.entity';

export class Modalidad {
  id: number;
  modalidad: string;
  conductor?: Publicador[];
  programa?: ProgramaPredicacion[];
}
