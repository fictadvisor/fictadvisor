import { Test, type TestingModule } from '@nestjs/testing';
import { StudentResourceService } from './student-resource.service';

describe('StudentResourceService', () => {
  let service: StudentResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentResourceService],
    }).compile();

    service = module.get<StudentResourceService>(StudentResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
