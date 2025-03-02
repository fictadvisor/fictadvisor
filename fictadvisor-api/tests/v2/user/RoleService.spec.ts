import { Test } from '@nestjs/testing';
import { CreateRoleWithGrantsDTO } from '@fictadvisor/utils/requests';
import { DbRole } from '../../../src/database/v2/entities/DbRole';
import { PrismaModule } from '../../../src/database/PrismaModule';
import { RoleService } from '../../../src/modules/user/v2/RoleService';
import { PermissionService } from '../../../src/modules/permission/v2/PermissionService';
import { RoleRepository } from '../../../src/database/v2/repositories/RoleRepository';
import { NoPermissionException } from '../../../src/common/exceptions/NoPermissionException';

describe('RoleService', () => {
  let roleService: RoleService;
  let roleRepository: RoleRepository;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [RoleService, PermissionService],
      imports: [PrismaModule],
    }).compile();

    roleService = testingModule.get(RoleService);
    roleRepository = testingModule.get(RoleRepository);
  });

  describe('createRoleWithGrants', () => {
    const rolesWithCreatePermission = [{
      grants: [{
        permission: 'roles.create',
        set: true,
      }],
    }] as DbRole[];

    it('should throw an exception because user does not have permission to create roles with some grants', async function () {
      jest.spyOn(roleService as any, 'getUserHigherRoles').mockImplementation(async (_: string) => rolesWithCreatePermission);
      const data = {
        grants: [{
          permission: 'grants.create',
          set: true,
        }],
      } as CreateRoleWithGrantsDTO;
      const userId = '';

      expect.assertions(1);
      roleService.createRoleWithGrants(data, userId)
        .catch((e) => expect(e).toBeInstanceOf(NoPermissionException));
    });

    it('should throw an exception if parent role weight is bigger than role weight', async function () {
      jest.spyOn(roleService as any, 'getUserHigherRoles').mockImplementation(async (_: string) => rolesWithCreatePermission);
      jest.spyOn(roleRepository, 'findById').mockImplementation(async (_) => {
        return { weight: 100 } as any as Promise<DbRole>;
      });
      const data = {
        grants: [{
          permission: 'roles.create',
          set: true,
        }],
        weight: 50,
        parentId: 'parent',
      } as CreateRoleWithGrantsDTO;
      const userId = '';

      expect.assertions(1);
      roleService.createRoleWithGrants(data, userId)
        .catch((e) => expect(e).toBeInstanceOf(NoPermissionException));
    });

    it('should create role with no parent role', async function () {
      jest.spyOn(roleService as any, 'getUserHigherRoles').mockImplementation(async (_: string) => rolesWithCreatePermission);
      const mock = jest.spyOn(roleRepository, 'create').mockImplementation();
      const data = {
        grants: [{
          permission: 'roles.create',
          set: true,
        }],
      } as CreateRoleWithGrantsDTO;
      const userId = '';

      await roleService.createRoleWithGrants(data, userId);

      expect(mock.mock.calls.length).toBe(1);
    });
  });
});
