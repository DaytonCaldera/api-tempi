import { Test, TestingModule } from '@nestjs/testing';
import { PublicadorService } from './publicador.service';

describe('PublicadorService', () => {
  let service: PublicadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PublicadorService],
    }).compile();

    service = module.get<PublicadorService>(PublicadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
