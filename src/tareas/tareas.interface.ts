import { Publicador } from 'src/publicador/publicador.interface';

export interface Tarea {
  id: number;
  nombre: string;
  publicadores?: Publicador[];
}
