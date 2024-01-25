import { Test, TestingModule } from '@nestjs/testing';
import { FraccionService } from './fraccion.service';

describe('FraccionService', () => {
  let service: FraccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FraccionService],
    }).compile();

    service = module.get<FraccionService>(FraccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
