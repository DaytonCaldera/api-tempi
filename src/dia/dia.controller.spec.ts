import { Test, TestingModule } from '@nestjs/testing';
import { DiaController } from './dia.controller';

describe('DiaController', () => {
  let controller: DiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiaController],
    }).compile();

    controller = module.get<DiaController>(DiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
