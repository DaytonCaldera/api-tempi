import { Test, TestingModule } from '@nestjs/testing';
import { RegistroPredicacionService } from './registro-predicacion.service';

describe('RegistroPredicacionService', () => {
  let service: RegistroPredicacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroPredicacionService],
    }).compile();

    service = module.get<RegistroPredicacionService>(RegistroPredicacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
