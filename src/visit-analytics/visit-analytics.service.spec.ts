import { Test, TestingModule } from '@nestjs/testing';
import { VisitAnalyticsService } from './visit-analytics.service';

describe('VisitAnalyticsService', () => {
  let service: VisitAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisitAnalyticsService],
    }).compile();

    service = module.get<VisitAnalyticsService>(VisitAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
