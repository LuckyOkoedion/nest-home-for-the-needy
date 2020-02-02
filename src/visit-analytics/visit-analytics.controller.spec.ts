import { Test, TestingModule } from '@nestjs/testing';
import { VisitAnalyticsController } from './visit-analytics.controller';

describe('VisitAnalytics Controller', () => {
  let controller: VisitAnalyticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitAnalyticsController],
    }).compile();

    controller = module.get<VisitAnalyticsController>(VisitAnalyticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
