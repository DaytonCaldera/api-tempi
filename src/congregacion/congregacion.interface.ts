import { Grupo } from 'src/grupo/grupo.interface';
import { Publicador } from 'src/publicador/publicador.interface';

export class Congregacion {
  id: number;
  nombre: string;
  grupos: Grupo[];
  publicadores: Publicador[];
}
