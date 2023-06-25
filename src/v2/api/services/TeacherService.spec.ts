import { Test } from '@nestjs/testing';
import { TeacherService } from './TeacherService';
import { TeacherModule } from '../../modules/TeacherModule';
import { ConfigurationModule } from '../../modules/ConfigModule';
import Configuration from '../../config/Configuration';
import { PollModule } from '../../modules/PollModule';
import { PollService } from './PollService';
import { DbQuestionWithAnswers } from '../../database/entities/DbQuestionWithAnswers';
import { ResponseQueryDTO } from '../dtos/ResponseQueryDTO';
import { PrismaModule } from '../../modules/PrismaModule';
import { MapperModule } from '../../modules/MapperModule';
import { QuestionDisplay } from '@prisma/client';
import { DateModule } from '../../utils/date/DateModule';

describe('TeacherService', () => {
  let teacherService: TeacherService;
  let pollService: PollService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TeacherService],
      imports: [
        TeacherModule,
        PollModule,
        MapperModule,
        PrismaModule,
        ConfigurationModule.forRoot({
          isGlobal: true,
          load: [Configuration],
        }),
        DateModule,
      ],
    }).compile();

    teacherService = moduleRef.get(TeacherService);
    pollService = moduleRef.get(PollService);
  });

  describe('getMarks', () => {
    it('should return an array of matching objects (mark must be an integer) if RADAR display and SCALE type', async () => {
      jest.spyOn(pollService, 'getQuestionWithMarks').mockImplementation(async () => (
        [{
          name: 'questionName',
          type: 'SCALE',
          display: 'RADAR',
          questionAnswers: [
            { value: 9 },
            { value: 10 },
          ],
        }] as any as Promise<DbQuestionWithAnswers[]>
      ));

      const teacherId = '';
      const data = {
        subjectId: '',
        year: 2022,
        semester: 2,
      } as ResponseQueryDTO;

      const result = await teacherService.getMarks(teacherId, data);

      expect(result).toStrictEqual([
        {
          name: 'questionName',
          amount: 2,
          type: 'RADAR',
          mark: 95,
        },
      ]);
    });

    it('should return an array of matching objects if AMOUNT display and SCALE type', async () => {
      jest.spyOn(pollService, 'getQuestionWithMarks').mockImplementation(async () => (
        [{
          name: 'questionName',
          type: 'SCALE',
          display: 'AMOUNT',
          questionAnswers: [
            { value: 2 },
            { value: 6 },
            { value: 6 },
          ],
        }] as any as Promise<DbQuestionWithAnswers[]>
      ));

      const teacherId = '';
      const data = {
        subjectId: '',
        year: 2022,
        semester: 2,
      } as ResponseQueryDTO;

      const result = await teacherService.getMarks(teacherId, data);

      expect(result).toStrictEqual([
        {
          name: 'questionName',
          amount: 3,
          type: 'AMOUNT',
          mark: { 1: 0, 2: 1, 3: 0, 4: 0, 5: 0, 6: 2, 7: 0, 8: 0, 9: 0, 10: 0 },
        },
      ]);
    });

    it('should return an array of matching objects (mark must be rounded to the hundredth) if CIRCLE display and TOGGLE type', async () => {
      jest.spyOn(pollService, 'getQuestionWithMarks').mockImplementation(async () => (
        [{
          name: 'questionName',
          type: 'TOGGLE',
          display: 'CIRCLE',
          questionAnswers: [
            { value: 1 },
            { value: 0 },
            { value: 1 },
          ],
        }] as any as Promise<DbQuestionWithAnswers[]>
      ));

      const teacherId = '';
      const data = {
        subjectId: '',
        year: 2022,
        semester: 2,
      } as ResponseQueryDTO;

      const result = await teacherService.getMarks(teacherId, data);

      expect(result).toStrictEqual([
        {
          name: 'questionName',
          amount: 3,
          type: 'CIRCLE',
          mark: 66.67,
        },
      ]);
    });

    it('should return an empty array if question answers is empty', async () => {
      jest.spyOn(pollService, 'getQuestionWithMarks').mockImplementation(async () => (
        [{
          questionAnswers: [],
        }] as any as Promise<DbQuestionWithAnswers[]>
      ));

      const teacherId = '';
      const data = {
        subjectId: '',
        year: 2022,
        semester: 2,
      } as ResponseQueryDTO;

      const result = await teacherService.getMarks(teacherId, data);

      expect(result).toStrictEqual([]);
    });
  });

  describe('checkQueryDate', () => {
    it('should return undefined if there is year and semester', () => {
      const data = {
        year: 2023,
        semester: 2,
      };

      const result = teacherService.checkQueryDate(data);

      expect(result).toBeUndefined();
    });

    it('should return undefined if there is not year and semester', () => {
      const data = {} as ResponseQueryDTO;

      const result = teacherService.checkQueryDate(data);

      expect(result).toBeUndefined();
    });

    it('should throw an exception if there is not year', () => {
      const data = {
        semester: 3,
      } as ResponseQueryDTO;

      const result = () => teacherService.checkQueryDate(data);

      expect(result).toThrow();
    });

    it('should throw an exception if there is not semester', () => {
      const data = {
        year: 2022,
      } as ResponseQueryDTO;

      const result = () => teacherService.checkQueryDate(data);

      expect(result).toThrow();
    });
  });

  describe('getRating', () => {
    it('should calculate teacher rating', async () => {
      jest.spyOn(teacherService, 'getMarks').mockImplementation(() => ([
        {
          name: 'Radar1',
          amount: 10,
          type: QuestionDisplay.RADAR,
          mark: 60,
        },
        {
          name: 'Circle1',
          amount: 10,
          type: QuestionDisplay.CIRCLE,
          mark: 70,
        },
        {
          name: 'Radar2',
          amount: 10,
          type: QuestionDisplay.RADAR,
          mark: 40,
        },
        {
          name: 'Amount1',
          amount: 10,
          type: QuestionDisplay.AMOUNT,
          mark: {
            '1': 0,
            '2': 2,
            '3': 2,
            '4': 0,
            '5': 1,
            '6': 1,
            '7': 2,
            '8': 2,
            '9': 0,
            '10': 0,
          },
        },
      ] as any));

      const result = await teacherService.getRating('id');
      expect(result).toBe(55.25);
    });

    it('should return 0 if there are no marks', async () => {
      jest.spyOn(teacherService, 'getMarks').mockImplementation(() => [] as any);

      const result = await teacherService.getRating('id');
      expect(result).toBe(0);
    });

    it('should return 0 if amount of votes less then 8', async () => {
      jest.spyOn(teacherService, 'getMarks').mockImplementation(() => [
        {
          name: 'Radar1',
          amount: 7,
          type: QuestionDisplay.RADAR,
          mark: 60,
        },
        {
          name: 'Circle1',
          amount: 7,
          type: QuestionDisplay.CIRCLE,
          mark: 70,
        },
      ] as any);

      const result = await teacherService.getRating('id');
      expect(result).toBe(0);
    });
  });
});
