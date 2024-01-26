import { Publicador } from 'src/publicador/publicador.interface';

export interface Grupo {
  id: number;
  nombre: string;
  publicadores?: Publicador[];
}
