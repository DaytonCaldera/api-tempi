import { Test, TestingModule } from '@nestjs/testing';
import { GrupoService } from './grupo.service';
import { Grupo } from './grupo.interface';

describe('GrupoService', () => {
  let service: GrupoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrupoService],
    }).compile();

    service = module.get<GrupoService>(GrupoService);
    service.createGrupo = jest.fn().mockReturnValue({} as Grupo);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
