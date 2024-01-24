import { Grupo } from './../grupo/grupo.interface';
export interface Publicador {
  id: number;
  id_grupo: number;
  nombre: string;
  apellido1: string;
}

export interface PublicadorGrupo extends Grupo, Publicador {}
