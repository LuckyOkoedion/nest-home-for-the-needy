import { Test, TestingModule } from '@nestjs/testing';
import { AboutPageService } from './about-page.service';

describe('AboutPageService', () => {
  let service: AboutPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AboutPageService],
    }).compile();

    service = module.get<AboutPageService>(AboutPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
