import { Test, TestingModule } from '@nestjs/testing';
import { PublicadorController } from './publicador.controller';

describe('PublicadorController', () => {
  let controller: PublicadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PublicadorController],
    }).compile();

    controller = module.get<PublicadorController>(PublicadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
