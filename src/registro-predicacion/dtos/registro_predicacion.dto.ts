import { IsNotEmpty } from 'class-validator';
export class CreateRegistroPredicacionDto {
  @IsNotEmpty()
  territorioId: number;
  inicio: Date;
  programado: Date;
  asignados: number[];
  periodo: number;
}

export class UpdateRegistroPredicacionDto {
  @IsNotEmpty()
  id: number;
  territorioId: number;
  programado?: Date;
  asignados?: number[];
  periodo?: number;
  inicio?: Date;
  final?: Date;
}
