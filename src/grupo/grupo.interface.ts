import { Congregacion } from 'src/congregacion/congregacion.interface';
import { Publicador } from 'src/publicador/publicador.interface';

export interface Grupo {
  id: number;
  nombre: string;
  congregacion: Congregacion;
  publicadores?: Publicador[];
  encargado?: Publicador;
  auxiliar?: Publicador;
}
