import { PartialType } from '@nestjs/mapped-types';
import { CreateCongregacionDto } from './create-congregacion.dto';

export class UpdateCongregacionDto extends PartialType(CreateCongregacionDto) {}
