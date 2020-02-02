import { Test, TestingModule } from '@nestjs/testing';
import { CampHouseService } from './camp-house.service';

describe('CampHouseService', () => {
  let service: CampHouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CampHouseService],
    }).compile();

    service = module.get<CampHouseService>(CampHouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
