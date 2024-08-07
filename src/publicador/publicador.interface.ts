import { Grupo } from './../grupo/grupo.interface';
import { Congregacion } from 'src/congregacion/congregacion.interface';
import { Dia } from 'src/dia/dia.interface';
import { Modalidad } from 'src/modalidad/modalidad.interface';
import { RegistroPredicacion } from 'src/registro-predicacion/registro-predicacion.interface';
import { Tarea } from 'src/tareas/tareas.interface';
export interface Publicador {
  id: number;
  nombre: string;
  apellido1: string;
  grupo: Grupo;
  tareas?: Tarea[];
  nombreCompleto?: string;
  congregacion: Congregacion;
  dias?: Dia[];
  modalidades?: Modalidad[];
  registro?: RegistroPredicacion[];
}

export interface PublicadorGrupo extends Grupo, Publicador {}
