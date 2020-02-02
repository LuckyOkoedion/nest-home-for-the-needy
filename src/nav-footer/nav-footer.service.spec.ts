import { Test, TestingModule } from '@nestjs/testing';
import { NavFooterService } from './nav-footer.service';

describe('NavFooterService', () => {
  let service: NavFooterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NavFooterService],
    }).compile();

    service = module.get<NavFooterService>(NavFooterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
