import { Dia } from 'src/dia/dia.interface';
import { Publicador } from 'src/publicador/publicador.interface';
import { RegistroPredicacion } from 'src/registro-predicacion/registro-predicacion.interface';

export interface Conductor {
  id: number;
  publicador: Publicador;
  dias: Dia[];
  registro?: RegistroPredicacion[];
}
