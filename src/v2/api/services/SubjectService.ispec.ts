import { SubjectService } from './SubjectService';
import { Test } from '@nestjs/testing';
import { MapperModule } from '../../modules/MapperModule';
import { PrismaModule } from '../../modules/PrismaModule';

describe('SubjectService', () => {
  let subjectService: SubjectService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SubjectService],
      imports: [
        PrismaModule,
        MapperModule,
      ],
    }).compile();

    subjectService = moduleRef.get(SubjectService);
  });

  describe('get', () => {
    it('should return one subject', async () => {
      const subject = await subjectService.get('87e204ea-4243-4633-b69d-014613bac59e');

      expect(subject).toBeDefined();
    });
  });
});