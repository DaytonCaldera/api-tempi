import { Conductor } from 'src/conductor/entities/conductor.entity';
import { Grupo } from './../grupo/grupo.interface';
export interface Publicador {
  id: number;
  nombre: string;
  apellido1: string;
  grupo: Grupo;
  conductor?: Conductor;
}

export interface PublicadorGrupo extends Grupo, Publicador {}
