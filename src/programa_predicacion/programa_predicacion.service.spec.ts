import { Test, TestingModule } from '@nestjs/testing';
import { ProgramaPredicacionService } from './programa_predicacion.service';

describe('ProgramaPredicacionService', () => {
  let service: ProgramaPredicacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProgramaPredicacionService],
    }).compile();

    service = module.get<ProgramaPredicacionService>(ProgramaPredicacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
