import { Test, TestingModule } from '@nestjs/testing';
import { NavFooterController } from './nav-footer.controller';

describe('NavFooter Controller', () => {
  let controller: NavFooterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NavFooterController],
    }).compile();

    controller = module.get<NavFooterController>(NavFooterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
