import { IsNotEmpty } from 'class-validator';
export class CreateRegistroPredicacionDto {
  @IsNotEmpty()
  territorioId: number;
  inicio: Date;
  asignados: number[];
}

export class UpdateRegistroPredicacionDto {
  @IsNotEmpty()
  id: number;
  territorioId: number;
  programado?: Date;
  asignados?: number[];
  final?: Date;
}
