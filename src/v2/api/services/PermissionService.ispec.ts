import { PrismaModule } from '../../modules/PrismaModule';
import { Test } from '@nestjs/testing';
import { MapperModule } from '../../modules/MapperModule';
import { State } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';
import { PermissionService } from './PermissionService';
import { PERMISSION } from '../../security/PERMISSION';
import { DataNotFoundException } from '../../utils/exceptions/DataNotFoundException';

describe('PermissionService', () => {
  let prismaService: PrismaService;
  let permissionService: PermissionService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PermissionService,
        PrismaService,
      ],
      imports: [PrismaModule, MapperModule],
    }).compile();

    permissionService = moduleRef.get(PermissionService);
    prismaService = moduleRef.get(PrismaService);
        

    await prismaService.user.createMany({
      data: [
        {
          id: 'userWithAllPermissionsId',
          email: 'admin@gmail.com',
          state: State.APPROVED,
        }, {
          id: 'userWithAllGroupsPermissionsId',
          email: 'allGroups@gmail.com',
          state: State.APPROVED,
        }, {
          id: 'blockedUserId',
          email: 'user@gmail.com',
          state: State.APPROVED,
        },
      ],
    });

    await prismaService.group.create({
      data: {  id: 'testGroupId', code: 'TG-1' },
    });

    await prismaService.student.createMany({
      data: [
        { userId: 'userWithAllPermissionsId', groupId: 'testGroupId', state: 'APPROVED' },
        { userId: 'userWithAllGroupsPermissionsId', groupId: 'testGroupId', state: 'APPROVED' },
        { userId: 'blockedUserId', groupId: 'testGroupId', state: 'APPROVED' },
      ],
    });

    await prismaService.role.createMany({
      data: [
        { id: 'adminRoleId', name: 'ADMIN', weight: 100 },
        { id: 'captainRoleId', name: 'CAPTAIN', weight: 80 },
        { id: 'blockedRoleId', name: 'USER', weight: 60 },
      ],
    });

    await prismaService.userRole.createMany({
      data: [
        { studentId: 'userWithAllPermissionsId', roleId: 'adminRoleId' },
        { studentId: 'userWithAllGroupsPermissionsId', roleId: 'captainRoleId' },
        { studentId: 'blockedUserId', roleId: 'blockedRoleId' },
      ],
    });
    await prismaService.grant.createMany({
      data: [
        { id: 'AllGrantId', permission: '*', weight: 1, roleId: 'adminRoleId', set: true },
        { id: 'specialGroupGrantId', permission: 'groups.testGroupId.*', weight: 1, roleId: 'captainRoleId', set: true },
        { id: 'blockedAllGrantId', permission: '*', weight: 1, roleId: 'blockedRoleId', set: false },
      ],
    });

    
  });

  describe('checkPermissions', () => {
    it('should return all true', async () => {
      const userId = 'userWithAllPermissionsId';
      const values = {
        groupId: 'testGroupId',
      };

      const permissions: PERMISSION[] = [PERMISSION.GROUPS_CREATE, PERMISSION.QUESTIONS_DELETE, PERMISSION.GROUPS_$GROUPID_ADMIN_SWITCH];

      const result = await permissionService.checkPermissions(userId, { permissions, values });
      
      const expectedResult: Map<string, boolean> = new Map<string, boolean>([
        ['groups.create', true ],
        ['questions.delete', true ],
        ['groups.$groupId.admin.switch', true ],
      ]);
      expect(result).toEqual(expectedResult);
    });
    it('should throw DataNotFoundException', async () => {
      const userId = 'userWithAllPermissionsId';
      const values = { };

      const permissions: PERMISSION[] = [PERMISSION.GROUPS_$GROUPID_CAPTAIN_GET];

      await expect(
        permissionService.checkPermissions(userId, { permissions, values })
      ).rejects.toThrow(DataNotFoundException);
    });

    it('should return false for user permissions and true for group permissions', async () => {
      const userId = 'userWithAllGroupsPermissionsId';
      const values = {
        groupId: 'testGroupId',
      };

      const permissions: PERMISSION[] = [PERMISSION.USERS_$USERID_GET, PERMISSION.GROUPS_$GROUPID_CAPTAIN_GET];

      const result = await permissionService.checkPermissions(userId, { permissions, values });

      const expectedResult: Map<string, boolean> = new Map<string, boolean>([
        ['users.$userId.get', false ],
        ['groups.$groupId.captain.get', true ],
      ]);
      expect(result).toEqual(expectedResult);
    });

    it('should not work with unset grants', async () => {
      const userId = 'blockedUserId';
      const values = {
        groupId: 'testGroupId',
      };

      const permissions: PERMISSION[] = [PERMISSION.USERS_$USERID_GET, PERMISSION.GROUPS_$GROUPID_CAPTAIN_GET];

      const result = await permissionService.checkPermissions(userId, { permissions, values });

      const expectedResult: Map<string, boolean> = new Map<string, boolean>([
        ['users.$userId.get', false ],
        ['groups.$groupId.captain.get', false ],
      ]);
      expect(result).toEqual(expectedResult);
    });
  });

  afterAll(async () => {
    await prismaService.user.deleteMany();
    await prismaService.group.deleteMany();
    await prismaService.student.deleteMany();
    await prismaService.role.deleteMany();
    await prismaService.userRole.deleteMany();
    await prismaService.grant.deleteMany();
  });
});
