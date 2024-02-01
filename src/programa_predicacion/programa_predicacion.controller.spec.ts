import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaPredicacionController } from './programa_predicacion.controller';

describe('ProgramaPredicacionController', () => {
  let controller: ProgramaPredicacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramaPredicacionController],
    }).compile();

    controller = module.get<ProgramaPredicacionController>(ProgramaPredicacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
