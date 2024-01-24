import { Test, TestingModule } from '@nestjs/testing';
import { TerritorioController } from './territorio.controller';

describe('TerritorioController', () => {
  let controller: TerritorioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerritorioController],
    }).compile();

    controller = module.get<TerritorioController>(TerritorioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
