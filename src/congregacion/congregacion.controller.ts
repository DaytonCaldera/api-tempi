import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CongregacionService } from './congregacion.service';
import { CreateCongregacionDto } from './dto/create-congregacion.dto';
import { UpdateCongregacionDto } from './dto/update-congregacion.dto';

@Controller('congregacion')
export class CongregacionController {
  constructor(private readonly congregacionService: CongregacionService) {}

  @Post()
  create(@Body() createCongregacionDto: CreateCongregacionDto) {
    return this.congregacionService.create(createCongregacionDto);
  }

  @Get()
  findAll() {
    return this.congregacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.congregacionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCongregacionDto: UpdateCongregacionDto,
  ) {
    return this.congregacionService.update(+id, updateCongregacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.congregacionService.remove(+id);
  }
}
