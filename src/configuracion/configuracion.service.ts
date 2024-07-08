import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Configuracion as ConfiguracionEntity } from 'src/configuracion/entities/configuracion.entity';
import { Repository } from 'typeorm';
import { CreateConfiguracionDto } from './dtos/configuracion.dto';
import { DiaService } from 'src/dia/dia.service';

@Injectable()
export class ConfiguracionService {
  constructor(
    @InjectRepository(ConfiguracionEntity)
    private configuracionRepository: Repository<ConfiguracionEntity>,
    private diaService: DiaService,
  ) {}

  async create(createHorarioDto: CreateConfiguracionDto) {
    const dias = await this.diaService.obtenerDiasIds(createHorarioDto.dias);
    const nuevaConfiguracion = new ConfiguracionEntity();
    nuevaConfiguracion.tipo = createHorarioDto.tipo
      ? createHorarioDto.tipo
      : 'estandar';
    if (!dias)
      throw new BadRequestException(
        'Debe ingresar al menos un día valido para configurar',
        '401',
      );
    nuevaConfiguracion.dias = createHorarioDto.dias;
    if (createHorarioDto.hora == null) {
      throw new BadRequestException(
        'Debe ingresar al menos una hora valido para configurar',
        '401',
      );
    }
    nuevaConfiguracion.hora = createHorarioDto.hora;
    console.log(nuevaConfiguracion);
    
    const savedConfiguration =
      await this.configuracionRepository.save(nuevaConfiguracion);
    return savedConfiguration;
  }

  findAll() {
    return this.configuracionRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} horario`;
  }

  update(id: number, updateHorarioDto: any) {
    return `This action updates a #${id} horario` + updateHorarioDto;
  }

  remove(id: number) {
    return `This action removes a #${id} horario`;
  }
}
