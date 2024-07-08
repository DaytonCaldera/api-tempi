import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { CreateConfiguracionDto } from './dtos/configuracion.dto';

@Controller('configuracion')
export class ConfiguracionController {
  constructor(private readonly configuracionService: ConfiguracionService) {}
  @Post('/inicial')
  guardarConfiguracionInicial(
    @Body() createHorarioDto: CreateConfiguracionDto,
  ) {
    return this.configuracionService.create(createHorarioDto);
  }

  @Get()
  findAll() {
    return this.configuracionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configuracionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHorarioDto: any) {
    return this.configuracionService.update(+id, updateHorarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configuracionService.remove(+id);
  }
}
