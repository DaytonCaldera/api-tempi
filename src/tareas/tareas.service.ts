import { Injectable } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { In, Repository, SelectQueryBuilder } from 'typeorm';
import { Tarea as TareaEntity } from './entities/tarea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Tarea } from './tareas.interface';

@Injectable()
export class TareasService {
  private queryBuilder: SelectQueryBuilder<TareaEntity>;
  constructor(
    @InjectRepository(TareaEntity)
    private tareasRepository: Repository<TareaEntity>,
  ) {
    this.queryBuilder = this.tareasRepository.createQueryBuilder('tarea');
  }

  createQueryBuilder(): SelectQueryBuilder<TareaEntity> {
    return this.tareasRepository.createQueryBuilder('tarea');
  }

  create(createTareaDto: CreateTareaDto) {
    return this.tareasRepository.save(
      this.tareasRepository.create({
        nombre: createTareaDto.nombre,
      }),
    );
  }

  findAll() {
    return this.tareasRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tarea`;
  }

  buscarTareas(ids: number[]): Promise<Tarea[]> {
    return this.tareasRepository.find({
      where: { id: In(ids) },
    });
  }

  update(id: number, updateTareaDto: UpdateTareaDto) {
    return `This action updates a #${id} tarea`;
  }

  remove(id: number) {
    return `This action removes a #${id} tarea`;
  }
}
