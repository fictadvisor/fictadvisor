import { Test } from '@nestjs/testing';
import { QueryAllTeachersDTO } from '@fictadvisor/utils/requests';
import { SortQATParam } from '@fictadvisor/utils/enums';
import { TelegramAPI } from '../../../src/modules/telegram-api/telegram-api';
import { PrismaModule } from '../../../src/database/prisma.module';
import { TeacherMapperModule } from '../../../src/modules/teacher/v2/mappers/teacher-mapper.module';
import { DateService } from '../../../src/modules/date/v2/date.service';
import { TeacherService } from '../../../src/modules/teacher/v2/teacher.service';
import { DisciplineTeacherService } from '../../../src/modules/teacher/v2/discipline-teacher.service';
import { PollService } from '../../../src/modules/poll/v2/poll.service';
import { PrismaService } from '../../../src/database/v2/prisma.service';
import { TelegramConfigService } from '../../../src/config/telegram-config.service';
import { ConfigService } from '@nestjs/config';
import { InvalidEntityIdException } from '../../../src/common/exceptions/invalid-entity-id.exception';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

describe('TeacherService', () => {
  let teacherService: TeacherService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [TeacherService, DisciplineTeacherService, PollService, DateService, TelegramAPI,
        TelegramConfigService, ConfigService],
      imports: [
        PrismaModule,
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        TeacherMapperModule,
      ],
    }).compile();

    teacherService = moduleRef.get(TeacherService);
    prisma = moduleRef.get<PrismaService>(PrismaService);

    await prisma.teacher.createMany({
      data: [
        { id: 'teacher1', firstName: 'Вася', lastName: 'Пєтькін', middleName: 'Хоттабич' },
        { id: 'teacher2', firstName: 'Пєтя', lastName: 'Васькін' },
        { id: 'teacher3', firstName: 'Валентин', lastName: 'Зябра' },
        { id: 'teacher4', firstName: 'Костя', lastName: 'Жабкін', middleName: 'Михайлович' },
        { id: 'teacher5', firstName: 'Міша', lastName: 'Квакін' },
      ],
    });

    await prisma.subject.createMany({
      data: [
        { id: 'subject1', name: 'Вишмат' },
        { id: 'subject2', name: 'Фізика' },
        { id: 'subject3', name: 'Фізра' },
        { id: 'subject4', name: 'Прога' },
        { id: 'subject5', name: 'Мова' },
      ],
    });

    await prisma.group.createMany({
      data: [
        { id: 'group1', code: 'XX-00' },
        { id: 'group2', code: 'XX-01' },
        { id: 'group3', code: 'XX-02' },
      ],
    });

    await prisma.discipline.createMany({
      data: [
        { id: 'discipline1',
          semester: 1,
          year: 2022,
          groupId: 'group1',
          subjectId: 'subject1',
        },

        { id: 'discipline2',
          semester: 2,
          year: 2022,
          groupId: 'group2',
          subjectId: 'subject2',
        },

        { id: 'discipline3',
          semester: 1,
          year: 2022,
          groupId: 'group3',
          subjectId: 'subject3',
        },

        { id: 'discipline4',
          semester: 1,
          year: 2022,
          groupId: 'group3',
          subjectId: 'subject4',
        },
      ],
    });

    await prisma.disciplineTeacher.createMany({
      data: [
        { id: 'discipline-teacher1',
          teacherId: 'teacher1',
          disciplineId: 'discipline1' },

        { id: 'discipline-teacher2',
          teacherId: 'teacher2',
          disciplineId: 'discipline2' },

        { id: 'discipline-teacher3',
          teacherId: 'teacher3',
          disciplineId: 'discipline3' },

        { id: 'discipline-teacher4',
          teacherId: 'teacher1',
          disciplineId: 'discipline4' },
      ],
    });
  });

  describe('getAll', () => {
    it('should return teachers array', async () => {
      const teachers = await teacherService.getAll(new QueryAllTeachersDTO());

      expect(teachers).toBeDefined();
    });

    it('should have less than or 3 teachers', async () => {
      const query: QueryAllTeachersDTO = {
        pageSize: 3,
      };
      const { data: teachers } = await teacherService.getAll(query);

      expect(teachers.length).toBeLessThanOrEqual(3);
    });

    it('should return specific group teachers', async () => {
      const query: QueryAllTeachersDTO = {
        groupId: 'group3',
      };
      const { data: teachers } = await teacherService.getAll(query);

      expect(teachers.length).toBeGreaterThanOrEqual(1);
    });

    it('should return searched teachers', async () => {
      const query: QueryAllTeachersDTO = {
        search: 'Костя',
      };

      const { data: teachers } = await teacherService.getAll(query);

      expect(teachers.length).toEqual(1);
    });

    it('should sort in ascend order by lastName', async () => {
      const query: QueryAllTeachersDTO = {
        sort: SortQATParam.LAST_NAME,
        order: 'asc',
      };

      const { data: teachers } = await teacherService.getAll(query);

      for (let i = 0; i < teachers.length - 1; i++) {
        const current = teachers[i];
        const next = teachers[i + 1];

        expect(current.lastName <= next.lastName).toBe(true);
      }
    });

    it('should sort in descend order by lastName', async () => {
      const query: QueryAllTeachersDTO = {
        sort: SortQATParam.LAST_NAME,
        order: 'desc',
      };

      const { data: teachers } = await teacherService.getAll(query);

      for (let i = 0; i < teachers.length - 1; i++) {
        const current = teachers[i];
        const next = teachers[i + 1];
        if (next) {
          expect(current.lastName >= next.lastName).toBe(true);
        }
      }
    });

  });

  describe('getTeacherSubjects', () => {

    it('should return teacher subjects array (1)', async () => {
      const subjects = await teacherService.getTeacherSubjects('teacher2');

      expect(subjects.length).toEqual(1);
    });

    it('should return teacher subjects array (2)', async () => {
      const subjects = await teacherService.getTeacherSubjects('teacher1');

      expect(subjects.length).toEqual(2);
    });

    it('should return empty teacher subjects array', async () => {
      const subjects = await teacherService.getTeacherSubjects('teacher5');

      expect(subjects.length).toEqual(0);
    });

  });

  describe('getTeacherSubject', () => {

    it('should return teacher subject', async () => {
      const subject = await teacherService.getTeacherSubject('teacher1', 'subject4');

      expect(subject).toBeDefined();
    });

    it('should return InvalidEntityIdException if not such subject of teacher', async () => {

      expect.assertions(1);
      await teacherService.getTeacherSubject('teacher1', 'subject5'
      ).catch((ex) => expect(ex).toBeInstanceOf(InvalidEntityIdException));

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
