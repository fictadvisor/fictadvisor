import { Test } from '@nestjs/testing';
import { InjectionToken } from '@nestjs/common';
import { PrismaModule } from '../../../src/database/prisma.module';
import { GroupMapperModule } from '../../../src/modules/group/v2/mappers/group-mapper.module';
import { UserService } from '../../../src/modules/user/v2/user.service';
import { PrismaService } from '../../../src/database/v2/prisma.service';
import { GroupService } from '../../../src/modules/group/v2/group.service';
import { DateService } from '../../../src/modules/date/v2/date.service';
import { FileService } from '../../../src/modules/file/file.service';
import { StudentRepository } from '../../../src/database/v2/repositories/student.repository';
import { UserRepository } from '../../../src/database/v2/repositories/user.repository';
import { RoleRepository } from '../../../src/database/v2/repositories/role.repository';
import { GroupRepository } from '../../../src/database/v2/repositories/group.repository';
import { DisciplineRepository } from '../../../src/database/v2/repositories/discipline.repository';
import { NoPermissionException } from '../../../src/common/exceptions/no-permission.exception';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

describe('GroupService', () => {
  let groupService: GroupService;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [GroupService, PrismaService],
      imports: [
        PrismaModule,
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
        GroupMapperModule,
      ],
    }).useMocker((token) => {
      const tokens = [
        GroupRepository,
        UserService,
        StudentRepository,
        UserRepository,
        RoleRepository,
        DisciplineRepository,
        DateService,
        FileService,
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
