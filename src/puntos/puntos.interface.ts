import { Dia } from 'src/dia/dia.interface';
import { Grupo } from 'src/grupo/grupo.interface';

export interface Puntos {
  id: number;
  nombre: string;
  dias: Dia[];
  grupo?: Grupo;
}
