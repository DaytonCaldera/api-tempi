import { Dia } from 'src/dia/dia.interface';
import { Modalidad } from 'src/modalidad/modalidad.interface';
import { ProgramaPredicacion } from 'src/programa_predicacion/programa_predicacion.interface';
import { Publicador } from 'src/publicador/publicador.interface';
import { RegistroPredicacion } from 'src/registro-predicacion/registro-predicacion.interface';

export interface Conductor {
  id: number;
  publicador: Publicador;
  dias: Dia[];
  registro?: RegistroPredicacion[];
  modalidades?: Modalidad[]; // 1 - presencial, 2 - videoconferencia
  programas?: ProgramaPredicacion[];
}
