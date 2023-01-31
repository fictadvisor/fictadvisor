import { Test, TestingModule } from '@nestjs/testing';
import { StudentResourceController } from './student-resource.controller';

describe('StudentResourceController', () => {
  let controller: StudentResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentResourceController],
    }).compile();

    controller = module.get<StudentResourceController>(
      StudentResourceController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
