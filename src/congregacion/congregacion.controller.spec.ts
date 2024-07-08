import { Test, TestingModule } from '@nestjs/testing';
import { CongregacionController } from './congregacion.controller';
import { CongregacionService } from './congregacion.service';

describe('CongregacionController', () => {
  let controller: CongregacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CongregacionController],
      providers: [CongregacionService],
    }).compile();

    controller = module.get<CongregacionController>(CongregacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
