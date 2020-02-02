import { Test, TestingModule } from '@nestjs/testing';
import { BlogPageService } from './blog-page.service';

describe('BlogPageService', () => {
  let service: BlogPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogPageService],
    }).compile();

    service = module.get<BlogPageService>(BlogPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
