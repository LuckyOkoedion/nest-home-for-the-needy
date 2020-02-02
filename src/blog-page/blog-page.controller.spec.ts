import { Test, TestingModule } from '@nestjs/testing';
import { BlogPageController } from './blog-page.controller';

describe('BlogPage Controller', () => {
  let controller: BlogPageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPageController],
    }).compile();

    controller = module.get<BlogPageController>(BlogPageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
