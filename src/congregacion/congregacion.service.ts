import { Injectable } from '@nestjs/common';
import { CreateCongregacionDto } from './dto/create-congregacion.dto';
import { UpdateCongregacionDto } from './dto/update-congregacion.dto';

@Injectable()
export class CongregacionService {
  create(createCongregacionDto: CreateCongregacionDto) {
    return 'This action adds a new congregacion';
  }

  findAll() {
    return `This action returns all congregacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} congregacion`;
  }

  update(id: number, updateCongregacionDto: UpdateCongregacionDto) {
    return `This action updates a #${id} congregacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} congregacion`;
  }
}
