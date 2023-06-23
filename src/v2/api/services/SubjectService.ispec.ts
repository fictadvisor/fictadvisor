import { SubjectService } from './SubjectService';
import { Test } from '@nestjs/testing';
import { MapperModule } from '../../modules/MapperModule';
import { PrismaModule } from '../../modules/PrismaModule';
import { QueryAllSubjectDTO } from '../dtos/QueryAllSubjectDTO';
import { PrismaService } from '../../database/PrismaService';
import { TeacherService } from './TeacherService';
import { DisciplineTeacherService } from './DisciplineTeacherService';
import { PollService } from './PollService';
import { TelegramAPI } from '../../telegram/TelegramAPI';
import { DateService } from '../../utils/date/DateService';
import { TelegramConfigService } from '../../config/TelegramConfigService';
import { ConfigService } from '@nestjs/config';

describe('SubjectService', () => {
  let subjectService: SubjectService;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SubjectService, TeacherService, DisciplineTeacherService, PollService, DateService, TelegramAPI,
        TelegramConfigService, ConfigService],
      imports: [
        PrismaModule,
        MapperModule,
      ],
    }).compile();

    subjectService = moduleRef.get(SubjectService);
    prisma = moduleRef.get<PrismaService>(PrismaService);

    await prisma.subject.createMany({
      data: [
        { id: '87e204ea-4243-4633-b69d-014613bac01s', name: 'subject1' },
        { id: '87e204ea-4243-4633-b69d-014613bac02s', name: 'subject2' },
        { id: '87e204ea-4243-4633-b69d-014613bac03s', name: 'subject3' },
        { id: '87e204ea-4243-4633-b69d-014613bac04s', name: 'subject4' },
        { id: '87e204ea-4243-4633-b69d-014613bac05s', name: 'subject5' },
      ],
    });

    await prisma.group.createMany({
      data: [
        { id: '87e204ea-4243-4633-b69d-014613bac01g', code: 'ТГ-01' },
        { id: '87e204ea-4243-4633-b69d-014613bac02g', code: 'ТГ-02' },
      ],
    });

    await prisma.discipline.createMany({
      data: [
        { id: '87e204ea-4243-4633-b69d-014613bac01d',
          semester: 1,
          year: 2022,
          groupId: '87e204ea-4243-4633-b69d-014613bac01g',
          subjectId: '87e204ea-4243-4633-b69d-014613bac01s',
        },
        { id: '87e204ea-4243-4633-b69d-014613bac02d',
          semester: 2,
          year: 2022,
          groupId: '87e204ea-4243-4633-b69d-014613bac01g',
          subjectId: '87e204ea-4243-4633-b69d-014613bac02s',
        },
        { id: '87e204ea-4243-4633-b69d-014613bac03d',
          semester: 1,
          year: 2023,
          groupId: '87e204ea-4243-4633-b69d-014613bac02g',
          subjectId: '87e204ea-4243-4633-b69d-014613bac03s',
        },
        { id: '87e204ea-4243-4633-b69d-014613bac04d',
          semester: 1,
          year: 2023,
          groupId: '87e204ea-4243-4633-b69d-014613bac02g',
          subjectId: '87e204ea-4243-4633-b69d-014613bac04s',
        },
        { id: '87e204ea-4243-4633-b69d-014613bac05d',
          semester: 2,
          year: 2023,
          groupId: '87e204ea-4243-4633-b69d-014613bac02g',
          subjectId: '87e204ea-4243-4633-b69d-014613bac01s',
        },
      ],
    });

    await prisma.teacher.createMany({
      data: [
        { id: '87e204ea-4243-4633-b69d-014613bac01t', firstName: 'Teacher', lastName: 'Test01' },
        { id: '87e204ea-4243-4633-b69d-014613bac02t', firstName: 'Teacher', lastName: 'Test02' },
        { id: '87e204ea-4243-4633-b69d-014613bac03t', firstName: 'Teacher', lastName: 'Test03' },
      ],
    });

    await prisma.disciplineTeacher.createMany({
      data: [
        { id: '87e204ea-4243-4633-b69d-014613bac01dt',
          teacherId: '87e204ea-4243-4633-b69d-014613bac01t',
          disciplineId: '87e204ea-4243-4633-b69d-014613bac01d' },
        { id: '87e204ea-4243-4633-b69d-014613bac02dt',
          teacherId: '87e204ea-4243-4633-b69d-014613bac02t',
          disciplineId: '87e204ea-4243-4633-b69d-014613bac02d' },
        { id: '87e204ea-4243-4633-b69d-014613bac03dt',
          teacherId: '87e204ea-4243-4633-b69d-014613bac03t',
          disciplineId: '87e204ea-4243-4633-b69d-014613bac05d' },
      ],
    });
  });

  describe('get', () => {
    it('should return one subject', async () => {
      const subject = await subjectService.get('87e204ea-4243-4633-b69d-014613bac59e');

      expect(subject).toBeDefined();
    });
  });

  describe('getAll',  () => {
    it('should have 3 subjects', async () => {
      const query: QueryAllSubjectDTO = {
        pageSize: 3,
      };
      const subjects = await subjectService.getAll(query);

      expect(subjects.length).toEqual(3);
    });
    it('should return specific group subjects', async () => {
      const query: QueryAllSubjectDTO = {
        group: '87e204ea-4243-4633-b69d-014613bac02g',
      };
      const subjects = await subjectService.getAll(query);

      expect(subjects.length).toEqual(3);
    });
    it('should return searched subjects', async () => {
      const query: QueryAllSubjectDTO = {
        search: 'subject2',
      };

      const subjects = await subjectService.getAll(query);

      expect(subjects.length).toEqual(1);
    });

    it('should sort in ascend order', async () => {
      const query: QueryAllSubjectDTO = {
        order: 'asc',
      };

      const subjects = await subjectService.getAll(query);

      for (let i = 0; i < subjects.length - 1; i++) {
        const current = subjects[i];
        const next = subjects[i + 1];

        expect(current.name <= next.name).toBe(true);
      }
    });

    it('should sort in descend order', async () => {
      const query: QueryAllSubjectDTO = {
        order: 'desc',
      };

      const subjects = await subjectService.getAll(query);

      for (let i = 0; i < subjects.length - 1; i++) {
        const current = subjects[i];
        const next = subjects[i + 1];
        if (next.length > 0) {
          expect(current.name >= next.name).toBe(true);
        }
      }
    });
  });

  describe('getTeachers', () => {
    it('should return correct teachers amount', async () => {
      const subjectId = '87e204ea-4243-4633-b69d-014613bac01s';

      const teachers = await subjectService.getTeachers(subjectId);

      expect(teachers.teachers.length).toEqual(2);
    });

    it('should return correct subject name', async () => {
      const subjectId = '87e204ea-4243-4633-b69d-014613bac01s';

      const teachers = await subjectService.getTeachers(subjectId);

      expect(teachers.subjectName === 'subject1').toBe(true);
    });

    it('should not return if incorrect id ', async () => {
      expect.assertions(1);
      await subjectService.getTeachers('some-incrrect-id').catch((err) => expect(err).toBeDefined());
    });
  });

  afterAll(async () => {
    await prisma.subject.deleteMany({});
    await prisma.teacher.deleteMany({});
    await prisma.group.deleteMany({});
    await prisma.discipline.deleteMany({});
    await prisma.disciplineTeacher.deleteMany({});
  });
});