import { Test, TestingModule } from '@nestjs/testing';
import { CampHouseController } from './camp-house.controller';

describe('CampHouse Controller', () => {
  let controller: CampHouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampHouseController],
    }).compile();

    controller = module.get<CampHouseController>(CampHouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
