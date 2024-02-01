export class CreateProgramaPredicacionDto {
  fecha: Date;
  punto: number;
  conductor: number;
  territorio?: number[];
  fraccion?: number[];
}

export class UpdateProgramaPredicacionDto {
  id: number;
  fecha: Date;
  punto: number;
  conductor: number;
  territorio?: number[];
  fraccion?: number[];
}
