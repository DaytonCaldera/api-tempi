import { Test, TestingModule } from '@nestjs/testing';
import { CongregacionService } from './congregacion.service';

describe('CongregacionService', () => {
  let service: CongregacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CongregacionService],
    }).compile();

    service = module.get<CongregacionService>(CongregacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
