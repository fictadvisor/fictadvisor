import { RoleService } from './RoleService';
import { Test } from '@nestjs/testing';
import { PrismaModule } from '../../modules/PrismaModule';
import { PermissionService } from './PermissionService';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { DbRole } from '../../database/entities/DbRole';
import { CreateRoleWithGrantsDTO } from '../dtos/CreateRoleWithGrantsDTO';
import { NoPermissionException } from '../../utils/exceptions/NoPermissionException';

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

  describe('createRole', () => {
    const rolesWithCreatePermission = [{
      grants: [{
        permission: 'roles.create',
        set: true,
      }],
    }] as DbRole[];
    const noRoles = [] as DbRole[];

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
      roleService.createRole(data, userId)
        .catch((e) => expect(e).toBeInstanceOf(NoPermissionException));
    });

    it('should throw an exception if user does not have permission to create roles', async function () {
      jest.spyOn(roleService as any, 'getUserHigherRoles').mockImplementation(async (_: string) => noRoles);
      const data = {} as any;
      const userId = '';

      expect.assertions(1);
      roleService.createRole(data, userId)
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
      roleService.createRole(data, userId)
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

      await roleService.createRole(data, userId);

      expect(mock.mock.calls.length).toBe(1);
    });
  });
});
