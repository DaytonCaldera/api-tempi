export class CreateGrupoDto {
  nombre: string;
  encargado?: number;
  auxiliar?: number;
}

export class UpdateGrupoDto {
  id: number;
  nombre?: string;
  encargado?: number;
  auxiliar?: number;
}

export class TablaGrupoDto {
  id: number;
  nombre?: string;
  encargado?: number;
  auxiliar?: number;
}
