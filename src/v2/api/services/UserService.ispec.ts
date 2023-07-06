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
import { ForbiddenException, InjectionToken } from '@nestjs/common';
import { PrismaModule } from '../../modules/PrismaModule';
import { MapperModule } from '../../modules/MapperModule';
import { DateService } from '../../utils/date/DateService';
import { NotBelongToGroupException } from '../../utils/exceptions/NotBelongToGroupException';
import { AlreadySelectedException } from '../../utils/exceptions/AlreadySelectedException';
import { ExcessiveSelectiveDisciplinesException } from '../../utils/exceptions/ExcessiveSelectiveDisciplinesException';
import { AlreadyRegisteredException } from '../../utils/exceptions/AlreadyRegisteredException';

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

    await prisma.user.createMany({
      data: [
        {
          id: 'userWithSelectiveId',
          email: 'pupsik@gmail.com',
          state: 'APPROVED',
        }, {
          id: 'pendingStudentId',
          email: 'pupsik1@gmail.com',
          state: 'APPROVED',
        },
      ],
    });

    await prisma.group.createMany({
      data: [
        {
          id: 'groupWithSelectiveIn2022Id',
          code: 'ІМ-22',
        }, {
          id: 'newGroupId',
          code: 'ІП-22',
        },
      ],
    });

    await prisma.student.createMany({
      data: [
        {
          userId: 'userWithSelectiveId',
          groupId: 'groupWithSelectiveIn2022Id',
          state: 'APPROVED',
        }, {
          userId: 'pendingStudentId',
          groupId: 'groupWithSelectiveIn2022Id',
          state: 'PENDING',
        },
      ],
    });

    await prisma.role.createMany({
      data: [
        {
          id: 'userRoleId',
          name: 'USER',
          weight: 20,
        }, {
          id: 'imCaptainId',
          name: 'CAPTAIN',
          weight: 80,
        }, {
          id: 'ipCaptainId',
          name: 'CAPTAIN',
          weight: 80,
        },
      ],
    });

    await prisma.groupRole.createMany({
      data: [
        {
          groupId: 'groupWithSelectiveIn2022Id',
          roleId: 'imCaptainId',
        }, {
          groupId: 'newGroupId',
          roleId: 'ipCaptainId',
        },
      ],
    });

    await prisma.userRole.createMany({
      data: [
        {
          studentId: 'userWithSelectiveId',
          roleId: 'userRoleId',
        }, {
          studentId: 'userWithSelectiveId',
          roleId: 'imCaptainId',
        },
      ],
    });

    await prisma.subject.createMany({
      data: [
        {
          id: 'selectiveSubject1Id',
          name: 'selective1',
        }, {
          id: 'selectiveSubject2Id',
          name: 'selective2',
        }, {
          id: 'selectiveSubjectOfNewGroupId',
          name: 'selective3',
        },
      ],
    });

    await prisma.discipline.createMany({
      data: [
        {
          id: 'selectiveDiscipline1Id',
          subjectId: 'selectiveSubject1Id',
          groupId: 'groupWithSelectiveIn2022Id',
          year: 2022,
          semester: 1,
          isSelective: true,
        }, {
          id: 'selectiveDiscipline2Id',
          subjectId: 'selectiveSubject2Id',
          groupId: 'groupWithSelectiveIn2022Id',
          year: 2022,
          semester: 2,
          isSelective: true,
        }, {
          id: 'selectiveDisciplineOfNewGroupId',
          subjectId: 'selectiveSubjectOfNewGroupId',
          groupId: 'newGroupId',
          year: 2022,
          semester: 2,
          isSelective: true,
        }, {
          id: 'excessiveSelectiveDisciplineId',
          subjectId: 'selectiveSubject1Id',
          groupId: 'groupWithSelectiveIn2022Id',
          year: 2022,
          semester: 2,
          isSelective: true,
        },
      ],
    });

    await prisma.selectiveAmount.createMany({
      data: [
        {
          groupId: 'groupWithSelectiveIn2022Id',
          year: 2022,
          semester: 1,
          amount: 3,
        }, {
          groupId: 'groupWithSelectiveIn2022Id',
          year: 2022,
          semester: 2,
          amount: 1,
        },
      ],
    });

    await prisma.selectiveDiscipline.createMany({
      data: [
        {
          disciplineId: 'selectiveDiscipline2Id',
          studentId: 'userWithSelectiveId',
        },
      ],
    });
  });

  describe('getSelectiveBySemesters', () => {
    it('should return correct object if student has selective in only one semester', async () => {
      const userId = 'userWithSelectiveId';
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
          amount: 1,
          disciplines: ['selective2'],
        },
      ]);
    });
  });

  describe('getRemainingSelective', () => {
    it('should return empty obj for reason all needed disciplines taken', async () => {
      const remainingDisciplines = await userService.getRemainingSelective(
        'userWithSelectiveId',
        { year: 2022, semester: 2 }
      );

      expect(remainingDisciplines).toStrictEqual({});
    });

    it('should return empty obj for incorrect date', async () => {
      const remainingDisciplines = await userService.getRemainingSelective(
        'userWithSelectiveId',
        { year: 2000, semester: 2 }
      );

      expect(remainingDisciplines).toStrictEqual({});
    });

    it('should return correct remaining disciplines', async () => {
      const remainingDisciplines = await userService.getRemainingSelective(
        'userWithSelectiveId',
        { year: 2022, semester: 1 }
      );

      const expectedRemaining = {
        availableSelectiveAmount: 3,
        year: 2022,
        semester: 1,
        remainingSelective: [
          {
            disciplineId: 'selectiveDiscipline1Id',
            subjectName: 'selective1',
          },
        ],
      };

      expect(remainingDisciplines).toStrictEqual(expectedRemaining);
    });
  });    

  describe('selectDisciplines', () => {
    it('should connect selective disciplines to student', async () => {
      await userService.selectDisciplines('userWithSelectiveId', { disciplines: ['selectiveDiscipline1Id'] });

      const result = await prisma.selectiveDiscipline.findMany({
        where: {
          studentId: 'userWithSelectiveId',
        },
      });

      expect(result).toStrictEqual([
        {
          disciplineId: 'selectiveDiscipline2Id',
          studentId: 'userWithSelectiveId',
        }, {
          disciplineId: 'selectiveDiscipline1Id',
          studentId: 'userWithSelectiveId',
        },
      ]);
    });

    it('should throw NotBelongToGroupException if discipline do not belong to users group',  async () => {
      await expect(
        userService.selectDisciplines('userWithSelectiveId', { disciplines: ['selectiveDisciplineOfNewGroupId'] })
      ).rejects.toThrow(NotBelongToGroupException);
    });

    it('should throw AlreadySelectedException if user have already selected this discipline', async () => {
      await expect(
        userService.selectDisciplines('userWithSelectiveId', { disciplines: ['selectiveDiscipline1Id'] })
      ).rejects.toThrow(AlreadySelectedException);
    });

    it('should throw ExcessiveSelectiveDisciplinesException if selected disciplines more than selective amount', async () => {
      await expect(
        userService.selectDisciplines('userWithSelectiveId', { disciplines: ['excessiveSelectiveDisciplineId'] })
      ).rejects.toThrow(ExcessiveSelectiveDisciplinesException);
    });
  });

  describe('changeGroup', () => {
    it('should correctly change the user\'s group and role', async () => {
      const studentId = 'userWithSelectiveId';
      const groupId = 'newGroupId';

      const { group, roles } = await userService.changeGroup(studentId, groupId);

      expect({ group, roles }).toStrictEqual({
        group: {
          id: 'newGroupId',
          code: 'ІП-22',
        },
        roles: [
          {
            studentId: 'userWithSelectiveId',
            roleId: 'userRoleId',
            role: {
              id: 'userRoleId',
              name: 'USER',
              weight: 20,
              parentId: null,
            },
          }, {
            studentId: 'userWithSelectiveId',
            roleId: 'ipCaptainId',
            role: {
              id: 'ipCaptainId',
              name: 'CAPTAIN',
              weight: 80,
              parentId: null,
            },
          },
        ],
      });
    });
  });

  describe('requestNewGroup', () => {
    it('should throw ForbiddenException if user state is APPROVED', async () => {
      const id = 'userWithSelectiveId';
      const request = {
        groupId: 'groupWithSelectiveIn2022Id',
        isCaptain: false,
      };

      await userService.requestNewGroup(id, request).catch((e) => {
        expect(e).toBeInstanceOf(ForbiddenException);
      });
    });

    it('should throw AlreadyRegisteredException if the group already has a captain', async () => {
      const id = 'pendingStudentId';
      const request = {
        groupId: 'newGroupId',
        isCaptain: true,
      };

      await userService.requestNewGroup(id, request).catch((e) => {
        expect(e).toBeInstanceOf(AlreadyRegisteredException);
      });
    });
  });

  afterAll(async () => {
    await prisma.selectiveDiscipline.deleteMany({});
    await prisma.userRole.deleteMany({});
    await prisma.groupRole.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.selectiveAmount.deleteMany({});
    await prisma.discipline.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.group.deleteMany({});
  });
});
