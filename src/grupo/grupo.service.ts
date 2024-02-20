import { Grupo as GrupoEntity } from '../database/entities/grupo.entity';
import { Injectable } from '@nestjs/common';
import { Grupo } from './grupo.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GrupoService {
  constructor(
    @InjectRepository(GrupoEntity)
    private grupoRepository: Repository<GrupoEntity>,
  ) {}
  showMessage(message: string): string {
    return message;
  }
  obtenerGrupos(): Promise<GrupoEntity[]> {
    return this.grupoRepository.find();
  }

  async createGrupo(grupo: Grupo): Promise<Grupo> {
    const createdGrupo = this.grupoRepository.create(grupo);
    const savedGrupo = await this.grupoRepository.save(createdGrupo);
    return savedGrupo;
  }

  async buscarGrupo(id: number, withRelations: boolean = true): Promise<Grupo> {
    const options = {
      where: { id },
      relations: [],
    };
    options.relations = withRelations ? ['publicadores'] : undefined;
    const grupo = await this.grupoRepository.findOne(options);
    return grupo;
  }

  async deleteGrupo(id: number) {
    return await this.grupoRepository.delete(id);
  }
}
