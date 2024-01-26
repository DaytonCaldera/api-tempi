import { Test, TestingModule } from '@nestjs/testing';
import { RegistroPredicacionController } from './registro-predicacion.controller';

describe('RegistroPredicacionController', () => {
  let controller: RegistroPredicacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroPredicacionController],
    }).compile();

    controller = module.get<RegistroPredicacionController>(RegistroPredicacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
