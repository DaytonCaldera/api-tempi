import { Conductor } from 'src/conductor/conductor.interface';
import { Grupo } from './../grupo/grupo.interface';
import { Congregacion } from 'src/congregacion/congregacion.interface';
export interface Publicador {
  id: number;
  nombre: string;
  apellido1: string;
  grupo: Grupo;
  conductor?: Conductor;
  nombreCompleto?: string;
  congregacion: Congregacion;
}

export interface PublicadorGrupo extends Grupo, Publicador {}
