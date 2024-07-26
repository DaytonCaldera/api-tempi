export class CreateProgramaPredicacionDto {
  fecha: Date;
  punto: number;
  conductor: number;
  territorios?: number[];
  fracciones?: number[];
  modalidad?: number;
}

export class UpdateProgramaPredicacionDto {
  id: number;
  fecha: Date;
  punto: number;
  conductor: number;
  territorios?: number[];
  fracciones?: number[];
  modalidad?: number;
}

export class DeleteProgramaPredicacionDto {
  id: number;
}

export class GenerarProgramDto {
  fecha_inicio: Date;
  fecha_final: Date;
}

export class TablaProgramaDto {
  id: number;
  fecha: Date;
  punto_id: number;
  punto: string;
  conductor_id: number;
  conductor: string;
  territorios?: CeldaTerritorio[];
  guardado?: boolean; // true si se ha guardado en la base de datos
  modalidad_id: number;
  modalidad: string;
}

export class CeldaTerritorio {
  territorio_id?: number;
  territorio?: string;
  fraccion?: boolean; // true si es fraccion
}

export class BusquedaFechasDto {
  constructor(inicio, final, generar = false) {
    this.fecha_inicio = inicio ? new Date(inicio) : null;
    this.fecha_final = final ? new Date(final) : null;
    this.generar = generar;
  }
  fecha_inicio?: Date;
  fecha_final?: Date;
  generar?: boolean; // true si se quiere generar el programa
  hay_rango(): boolean {
    return this.fecha_inicio != null && this.fecha_final != null ? true : false;
  }
}
