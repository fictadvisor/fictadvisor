import { UserService } from './UserService';
import { PrismaService } from '../../database/PrismaService';
import { Test } from '@nestjs/testing';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { UserRepository } from '../../database/repositories/UserRepository';
import { SuperheroRepository } from '../../database/repositories/SuperheroRepository';
import { ContactRepository } from '../../database/repositories/ContactRepository';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { AuthService } from './AuthService';
import { FileService } from '../../utils/files/FileService';
import { GroupService } from './GroupService';
import { StudentMapper } from '../../mappers/StudentMapper';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { InjectionToken } from '@nestjs/common';
import { PrismaModule } from '../../modules/PrismaModule';
import { MapperModule } from '../../modules/MapperModule';
import { DateService } from '../../utils/date/DateService';

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, PrismaService, GroupService, DateService],
      imports: [PrismaModule, MapperModule],
    }).useMocker((token) => {
      const tokens = [
        StudentRepository,
        UserRepository,
        SuperheroRepository,
        ContactRepository,
        RoleRepository,
        AuthService,
        FileService,
        StudentMapper,
        DisciplineMapper,
      ] as InjectionToken[];
      if (tokens.includes(token)) {
        return {};
      }
    }).compile();

    userService = moduleRef.get(UserService);
    prisma = moduleRef.get(PrismaService);

    await prisma.group.create({
      data: {
        id: 'groupId1',
        code: 'SA-32',
      },
    });

    await prisma.user.createMany({
      data: [
        {
          id: 'userId1',
          email: 'poshta@gmail.com',
        }, {
          id: 'userId2',
          email: 'poshta2@gmail.com',
        }, {
          id: 'userId3',
          email: 'poshta3@gmail.com',
        },
      ],
    });

    await prisma.student.createMany({
      data: [
        {
          userId: 'userId1',
          groupId: 'groupId1',
          state: 'APPROVED',
        }, {
          userId: 'userId2',
          groupId: 'groupId1',
          state: 'APPROVED',
        }, {
          userId: 'userId3',
          groupId: 'groupId1',
          state: 'APPROVED',
        },
      ],
    });

    await prisma.selectiveAmount.createMany({
      data: [
        {
          groupId: 'groupId1',
          year: 2022,
          semester: 1,
          amount: 3,
        }, {
          groupId: 'groupId1',
          year: 2022,
          semester: 2,
          amount: 4,
        },
      ],
    });

    await prisma.subject.createMany({
      data: [
        {
          id: 'subjectId1',
          name: 'subject1',
        }, {
          id: 'subjectId2',
          name: 'subject2',
        }, {
          id: 'subjectId3',
          name: 'subject3',
        }, {
          id: 'subjectId4',
          name: 'subject4',
        }, {
          id: 'subjectId5',
          name: 'subject5',
        },
      ],
    });

    await prisma.discipline.createMany({
      data: [
        {
          id: 'disciplineId1',
          subjectId: 'subjectId1',
          groupId: 'groupId1',
          year: 2022,
          semester: 2,
          isSelective: true,
        }, {
          id: 'disciplineId2',
          subjectId: 'subjectId2',
          groupId: 'groupId1',
          year: 2022,
          semester: 2,
          isSelective: true,
        }, {
          id: 'disciplineId3',
          subjectId: 'subjectId3',
          groupId: 'groupId1',
          year: 2022,
          semester: 1,
          isSelective: false,
        }, {
          id: 'disciplineId4',
          subjectId: 'subjectId4',
          groupId: 'groupId1',
          year: 2022,
          semester: 2,
          isSelective: true,
        },  {
          id: 'disciplineId5',
          subjectId: 'subjectId5',
          groupId: 'groupId1',
          year: 2022,
          semester: 2,
          isSelective: true,
        },  {
          id: 'disciplineId6',
          subjectId: 'subjectId5',
          groupId: 'groupId1',
          year: 2022,
          semester: 2,
          isSelective: true,
        },  {
          id: 'disciplineId7',
          subjectId: 'subjectId4',
          groupId: 'groupId1',
          year: 2022,
          semester: 1,
          isSelective: true,
        },
      ],
    });

    await prisma.selectiveDiscipline.createMany({
      data: [
        {
          disciplineId: 'disciplineId1',
          studentId: 'userId1',
        }, {
          disciplineId: 'disciplineId1',
          studentId: 'userId2',
        }, {
          disciplineId: 'disciplineId1',
          studentId: 'userId3',
        }, {
          disciplineId: 'disciplineId2',
          studentId: 'userId1',
        },  {
          disciplineId: 'disciplineId2',
          studentId: 'userId2',
        }, {
          disciplineId: 'disciplineId4',
          studentId: 'userId2',
        }, {
          disciplineId: 'disciplineId5',
          studentId: 'userId2',
        },
      ],
    });
  });

  describe('getSelectiveBySemesters', () => {
    it('should return correct object if student has selective in only one semester', async () => {
      const userId = 'userId1';
      const result = await userService.getSelectiveBySemesters(userId);
      expect(result).toStrictEqual([
        {
          year: 2022,
          semester: 1,
          amount: 3,
          disciplines: [],
        }, {
          year: 2022,
          semester: 2,
          amount: 4,
          disciplines: ['subject1', 'subject2'],
        },
      ]);
    });
  });

  describe('getRemainingSelective', () => {
    it('should return empty obj for reason all needed disciplines taken', async () => {
      const remainingDisciplines = await userService.getRemainingSelective(
        'userId2',
        { year: 2022, semester: 2 }
      );

      expect(remainingDisciplines).toStrictEqual({});
    });

    it('should return empty obj for incorrect date', async () => {
      const remainingDisciplines = await userService.getRemainingSelective(
        'userId3',
        { year: 2000, semester: 2 }
      );

      expect(remainingDisciplines).toStrictEqual({});
    });

    it('should return correct remaining disciplines', async () => {
      const remainingDisciplines = await userService.getRemainingSelective(
        'userId3',
        { year: 2022, semester: 2 }
      );

      const expectedRemaining = {
        availableSelectiveAmount: 3,
        year: 2022,
        semester: 2,
        remainingSelective: [
          {
            disciplineId: 'disciplineId2',
            subjectName: 'subject2',
          }, {
            disciplineId: 'disciplineId4',
            subjectName: 'subject4',
          }, {
            disciplineId: 'disciplineId5',
            subjectName: 'subject5',
          }, {
            disciplineId: 'disciplineId6',
            subjectName: 'subject5',
          },
        ],
      };

      expect(remainingDisciplines).toStrictEqual(expectedRemaining);
    });
  });

  afterAll(async () => {
    await prisma.selectiveDiscipline.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.selectiveAmount.deleteMany({});
    await prisma.discipline.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.group.deleteMany({});
  });
});
