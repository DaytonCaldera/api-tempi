import { Grupo } from 'src/grupo/grupo.interface';
import { Publicador } from 'src/publicador/publicador.interface';
import { Puntos } from 'src/puntos/puntos.interface';
import { Territorio } from 'src/territorio/territorio.interface';

export class Congregacion {
  id: number;
  nombre: string;
  grupos: Grupo[];
  publicadores: Publicador[];
  territorios: Territorio[];
  puntos: Puntos[];
}
