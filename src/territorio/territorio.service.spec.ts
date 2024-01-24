import { Test, TestingModule } from '@nestjs/testing';
import { TerritorioService } from './territorio.service';

describe('TerritorioService', () => {
  let service: TerritorioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerritorioService],
    }).compile();

    service = module.get<TerritorioService>(TerritorioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
