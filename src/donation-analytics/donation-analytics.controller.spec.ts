import { Test, TestingModule } from '@nestjs/testing';
import { DonationAnalyticsController } from './donation-analytics.controller';

describe('DonationAnalytics Controller', () => {
  let controller: DonationAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationAnalyticsController],
    }).compile();

    controller = module.get<DonationAnalyticsController>(DonationAnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
