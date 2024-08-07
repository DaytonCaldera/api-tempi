import { Congregacion } from 'src/congregacion/congregacion.interface';
import { Dia } from 'src/dia/dia.interface';
import { Grupo } from 'src/grupo/grupo.interface';
import { Territorio } from 'src/territorio/territorio.interface';

export interface Puntos {
  id: number;
  nombre: string;
  dias: Dia[];
  grupo?: Grupo;
  territorios?: Territorio[];
  congregacion: Congregacion;
}
