import { UserService } from './UserService';
import { PrismaService } from '../../database/PrismaService';
import { Test } from '@nestjs/testing';
import { GroupService } from './GroupService';
import { DateService } from '../../utils/date/DateService';
import { PrismaModule } from '../../modules/PrismaModule';
import { MapperModule } from '../../modules/MapperModule';
import { StudentRepository } from '../../database/repositories/StudentRepository';
import { UserRepository } from '../../database/repositories/UserRepository';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { StudentMapper } from '../../mappers/StudentMapper';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { InjectionToken } from '@nestjs/common';
import { GroupRepository } from '../../database/repositories/GroupRepository';
import { DisciplineRepository } from '../../database/repositories/DisciplineRepository';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';

describe('GroupService', () => {
  let groupService: GroupService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GroupService, PrismaService],
      imports: [PrismaModule, MapperModule],
    }).useMocker((token) => {
      const tokens = [
        DisciplineMapper,
        GroupRepository,
        UserService,
        StudentRepository,
        UserRepository,
        RoleRepository,
        DisciplineRepository,
        StudentMapper,
        DateService,
      ] as InjectionToken[];
      if (tokens.includes(token)) {
        return {};
      }
    }).compile();

    groupService = moduleRef.get(GroupService);
    prisma = moduleRef.get(PrismaService);

    await prisma.user.createMany({
      data: [
        {
          id: 'newCaptainId',
          email: 'fiotvsehvrot1@gmail.com',
          state: 'APPROVED',
        },
        {
          id: 'oldCaptainId',
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
        },
        {
          id: 'groupForPermissionExceptionId',
          code: 'ІК-72',
        },
      ],
    });

    await prisma.student.createMany({
      data: [
        {
          userId: 'newCaptainId',
          groupId: 'groupWithTransferredRolesId',
          state: 'APPROVED',
        },
        {
          userId: 'oldCaptainId',
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
      ],
    });

    await prisma.userRole.createMany({
      data: [
        {
          studentId: 'oldCaptainId',
          roleId: 'captainRoleId',
        },
        {
          studentId: 'newCaptainId',
          roleId: 'studentRoleId',
        },
      ],
    });
  });

  describe('switchCaptain', () => {
    it('should transfer role from captain to student', async () => {
      const studentId = 'newCaptainId';
      const groupId = 'groupWithTransferredRolesId';

      await groupService.switchCaptain(groupId, studentId);

      const oldCaptainRoles = await prisma.userRole.findMany({
        where: {
          studentId: 'oldCaptainId',
        },
      });

      const newCaptainRoles = await prisma.userRole.findMany({
        where: {
          studentId: 'newCaptainId',
        },
      });

      expect(oldCaptainRoles).toStrictEqual([
        {
          roleId: 'studentRoleId',
          studentId: 'oldCaptainId',
        },
      ]);

      expect(newCaptainRoles).toStrictEqual([
        {
          roleId: 'captainRoleId',
          studentId: 'newCaptainId',
        },
      ]);
    });

    it('should throw NoPermissionException if captain and student are not in the same group', async () => {
      const studentId = 'newCaptainId';
      const groupId = 'groupForPermissionExceptionId';

      await groupService.switchCaptain(groupId, studentId).catch((e) => {
        expect(e).toBeInstanceOf(NoPermissionException);
      });
    });
  });

  afterAll(async () => {
    await prisma.userRole.deleteMany({});
    await prisma.groupRole.deleteMany({});
    await prisma.role.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.group.deleteMany({});
  });
});