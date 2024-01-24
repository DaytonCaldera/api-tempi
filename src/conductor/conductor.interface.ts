import { Dia } from 'src/dia/dia.interface';
import { Publicador } from 'src/publicador/publicador.interface';

export interface Conductor {
  id: number;
  publicador: Publicador;
  dias: Dia[];
}
