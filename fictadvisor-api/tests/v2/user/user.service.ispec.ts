import { Test } from '@nestjs/testing';
import { ForbiddenException, InjectionToken } from '@nestjs/common';
import { TelegramAPI } from '../../../src/modules/telegram-api/telegram-api';
import { PrismaModule } from '../../../src/database/prisma.module';
import { UserMapperModule } from '../../../src/modules/user/v2/mappers/user-mapper.module';
import { DisciplineMapperModule } from '../../../src/modules/discipline/v2/mappers/discipline-mapper.module';
import { UserService } from '../../../src/modules/user/v2/user.service';
import { AuthService } from '../../../src/modules/auth/v2/auth.service';
import { GroupService } from '../../../src/modules/group/v2/group.service';
import { DateService } from '../../../src/modules/date/v2/date.service';
import { DisciplineTeacherService } from '../../../src/modules/teacher/v2/discipline-teacher.service';
import { PollService } from '../../../src/modules/poll/v2/poll.service';
import { FileService } from '../../../src/modules/file/file.service';
import { PrismaService } from '../../../src/database/v2/prisma.service';
import { StudentRepository } from '../../../src/database/v2/repositories/student.repository';
import { UserRepository } from '../../../src/database/v2/repositories/user.repository';
import { ContactRepository } from '../../../src/database/v2/repositories/contact.repository';
import { RoleRepository } from '../../../src/database/v2/repositories/role.repository';
import { NotBelongException } from '../../../src/common/exceptions/not-belong.exception';
import { AlreadySelectedException } from '../../../src/common/exceptions/already-selected.exception';
import { ExcessiveSelectiveDisciplinesException } from '../../../src/common/exceptions/excessive-selective-disciplines.exception';
import { NotSelectedDisciplineException } from '../../../src/common/exceptions/not-selected-discipline.exception';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { StudentMapperModule } from '../../../src/modules/student/v2/mappers/student-mapper.module';

describe('UserService', () => {
  let userService: UserService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [UserService, PrismaService, GroupService, DateService, PollService],
      imports: [
        PrismaModule,
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        UserMapperModule,
        DisciplineMapperModule,
        StudentMapperModule,
      ],
    }).useMocker((token) => {
      const tokens = [
        TelegramAPI,
        StudentRepository,
        UserRepository,
        ContactRepository,
        RoleRepository,
        AuthService,
        FileService,
        DisciplineTeacherService,
        PollService,
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
          id: 'transferredCaptainId',
          email: 'fiotvsehvrot1@gmail.com',
          state: 'APPROVED',
        },
        {
          id: 'transferredStudentId',
          email: 'fiotvsehvrot2@gmail.com',
          state: 'APPROVED',
        },
      ],
    });

    await prisma.group.createMany({
      data: [
        {
          id: 'groupWithTransferredRolesId',
          code: 'IM-54',
        }, {
          id: 'staticGroupId',
          code: 'IO-19',
        }, {
          id: 'groupWithSelectiveIn2022Id',
          code: 'ІМ-22',
        }, {
          id: 'newGroupId',
          code: 'ІП-22',
        }, {
          id: 'groupWithoutSelectiveId',
          code: 'ІС-22',
        },
      ],
    });

    await prisma.student.createMany({
      data: [
        {
          userId: 'transferredCaptainId',
          groupId: 'groupWithTransferredRolesId',
          state: 'APPROVED',
        },
        {
          userId: 'transferredStudentId',
          groupId: 'groupWithTransferredRolesId',
          state: 'APPROVED',
        },
      ],
    });

    await prisma.role.createMany({
      data: [
        {
          id: 'studentRoleId',
          name: 'STUDENT',
          weight: 50,
        }, {
          id: 'captainRoleId',
          name: 'CAPTAIN',
          weight: 80,
        },
        {
          id: 'newStudentRoleId',
          name: 'STUDENT',
          weight: 50,
        },
      ],
    });

    await prisma.groupRole.createMany({
      data: [
        {
          groupId: 'groupWithTransferredRolesId',
          roleId: 'studentRoleId',
        },
        {
          groupId: 'groupWithTransferredRolesId',
          roleId: 'captainRoleId',
        },
        {
          groupId: 'newGroupId',
          roleId: 'newStudentRoleId',
        },
      ],
    });


    await prisma.userRole.createMany({
      data: [
        {
          studentId: 'transferredCaptainId',
          roleId: 'captainRoleId',
        },
        {
          studentId: 'transferredStudentId',
          roleId: 'studentRoleId',
        },
      ],
    });



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
        }, {
          id: 'userWithoutSelective',
          email: 'kroshka@gmail.com',
          state: 'APPROVED',
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
        {
          userId: 'userWithoutSelective',
          groupId: 'groupWithoutSelectiveId',
          state: 'APPROVED',
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
        }, {
          id: 'notSelectedSubjectId',
          name: 'selective4',
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
        {
          id: 'nonSelectedDisciplineId',
          subjectId: 'notSelectedSubjectId',
          groupId: 'groupWithoutSelectiveId',
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
      const result = await userService.getSelectivesBySemesters(userId);
      expect(result).toEqual({
        selectives: [
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
        ],
      });
    });
  });

  describe('getSelectiveBySemesters', () => {
    it('should return correct object if student has selective in only one semester', async () => {
      const userId = 'userWithSelectiveId';
      const result = await userService.getSelectivesBySemesters(userId);
      expect(result).toEqual({
        selectives: [
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
        ],
      });
    });
  });

  describe('getRemainingSelectiveForSemester', () => {
    it('should return empty obj for reason all needed disciplines taken', async () => {
      const remainingDisciplines = await userService.getRemainingSelectivesForSemester(
        'userWithSelectiveId',
        { year: 2022, semester: 2 }
      );

      expect(remainingDisciplines).toStrictEqual({});
    });

    it('should return empty obj for incorrect date', async () => {
      const remainingDisciplines = await userService.getRemainingSelectivesForSemester(
        'userWithSelectiveId',
        { year: 2000, semester: 2 }
      );

      expect(remainingDisciplines).toStrictEqual({});
    });

    it('should return correct remaining disciplines', async () => {
      const remainingDisciplines = await userService.getRemainingSelectivesForSemester(
        'userWithSelectiveId',
        { year: 2022, semester: 1 }
      );

      const expectedRemaining = {
        availableSelectiveAmount: 3,
        year: 2022,
        semester: 1,
        remainingSelectives: [
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
        select: {
          studentId: true,
          disciplineId: true,
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

    it('should throw NotBelongException if the discipline does not belong to the user\'s group',  async () => {
      await expect(
        userService.selectDisciplines('userWithSelectiveId', { disciplines: ['selectiveDisciplineOfNewGroupId'] })
      ).rejects.toThrow(NotBelongException);
    });

    it('should throw AlreadySelectedException if the user has already selected this discipline', async () => {
      await expect(
        userService.selectDisciplines('userWithSelectiveId', { disciplines: ['selectiveDiscipline1Id'] })
      ).rejects.toThrow(AlreadySelectedException);
    });

    it('should throw ExcessiveSelectiveDisciplinesException if selected disciplines are more than selective amount', async () => {
      await expect(
        userService.selectDisciplines('userWithSelectiveId', { disciplines: ['excessiveSelectiveDisciplineId'] })
      ).rejects.toThrow(ExcessiveSelectiveDisciplinesException);
    });
  });

  describe('deselectDisciplines', () => {
    it('should disconnect selective disciplines from the student', async () => {
      await userService.deselectDisciplines('userWithSelectiveId', { disciplines: ['selectiveDiscipline1Id'] });

      const result = await prisma.selectiveDiscipline.findMany({
        where: {
          studentId: 'userWithSelectiveId',
        },
        select: {
          studentId: true,
          disciplineId: true,
        },
      });

      expect(result).toStrictEqual([
        {
          disciplineId: 'selectiveDiscipline2Id',
          studentId: 'userWithSelectiveId',
        },
      ]);
    });

    it('should throw NotBelongException if discipline does not belong to the user\'s group', async () => {
      await expect(
        userService.deselectDisciplines('userWithSelectiveId', { disciplines: ['selectiveDisciplineOfNewGroupId'] })
      ).rejects.toThrow(NotBelongException);
    });

    it('should throw NotSelectedDisciplineException if the user has not selected this discipline', async () => {
      await expect(
        userService.deselectDisciplines('userWithoutSelective', { disciplines: ['nonSelectedDisciplineId'] })
      ).rejects.toThrow(NotSelectedDisciplineException);
    });
  });

  describe('changeGroup', () => {
    it('should correctly change the user\'s group and role', async () => {
      const studentId = 'userWithSelectiveId';
      const groupId = 'newGroupId';

      const { group, roles } = await userService.changeGroup(studentId, groupId);

      expect({ group: {
        id: group.id,
        code: group.code,
      }, roles: roles.map((r) => ({
        studentId: r.studentId,
        roleId: r.roleId,
        role: {
          id: r.role.id,
          name: r.role.name,
          weight: r.role.weight,
          parentId: r.role.parentId,
        },
      })) }).toStrictEqual({
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
            roleId: 'newStudentRoleId',
            role: {
              id: 'newStudentRoleId',
              name: 'STUDENT',
              weight: 50,
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
