import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCongregacionDto } from './dto/create-congregacion.dto';
import { UpdateCongregacionDto } from './dto/update-congregacion.dto';
import { Repository } from 'typeorm';
import { Congregacion as CongregacionEntity } from './entities/congregacion.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CongregacionService {
  constructor(
    @InjectRepository(CongregacionEntity)
    private congregacionRepository: Repository<CongregacionEntity>,
  ) { }
  async create(createCongregacionDto: CreateCongregacionDto) {
    const nuevaCongregacion = this.congregacionRepository.create(
      createCongregacionDto,
    );
    return await this.congregacionRepository.save(nuevaCongregacion);
  }

  async findAll() {
    return await this.congregacionRepository.find();
  }

  async findOne(id: number) {
    return await this.congregacionRepository.findOne({
      where: { id: id },
    });
  }

  async update(id: number, updateCongregacionDto: UpdateCongregacionDto) {
    const congregacion = await this.findOne(id);
    if (!congregacion) {
      throw new NotFoundException('Congregacion no encontrada');
    }
    congregacion.nombre = updateCongregacionDto.nombre;
    return await this.congregacionRepository.save(congregacion);
  }

  remove(id: number) {
    return `This action removes a #${id} congregacion`;
  }
}
