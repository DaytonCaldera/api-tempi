import { Test, TestingModule } from '@nestjs/testing';
import { FraccionController } from './fraccion.controller';

describe('FraccionController', () => {
  let controller: FraccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FraccionController],
    }).compile();

    controller = module.get<FraccionController>(FraccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
