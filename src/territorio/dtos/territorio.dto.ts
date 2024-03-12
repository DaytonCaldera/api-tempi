export class CreateTerritorioDto {
  nombre: string;
  mapa?: string;
}

export class UpdateTerritorioDto {
  id: number;
  nombre?: string;
  mapa?: string;
  fraccion?: number;
}

export class TablaTerritoriosDto {
  id: number;
  nombre: string;
  mapa?: string;
  fraccion?: string;
}
