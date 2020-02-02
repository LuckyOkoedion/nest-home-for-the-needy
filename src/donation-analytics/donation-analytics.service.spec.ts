import { Test, TestingModule } from '@nestjs/testing';
import { DonationAnalyticsService } from './donation-analytics.service';

describe('DonationAnalyticsService', () => {
  let service: DonationAnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonationAnalyticsService],
    }).compile();

    service = module.get<DonationAnalyticsService>(DonationAnalyticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
