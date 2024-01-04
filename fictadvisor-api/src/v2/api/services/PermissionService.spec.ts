import { PermissionService } from './PermissionService';
import { RoleRepository } from '../../database/repositories/RoleRepository';
import { Test } from '@nestjs/testing';
import { UserRepository } from '../../database/repositories/UserRepository';
import { PrismaService } from '../../database/PrismaService';

describe('PermissionService', () => {
  let permissionService: PermissionService;

  beforeEach(async () => {
    const testingModule = await Test.createTestingModule({
      providers: [PermissionService, UserRepository, PrismaService],
    }).useMocker((token) => {
      if (token === RoleRepository) {
        return {};
      }
    })
      .compile();

    permissionService = testingModule.get(PermissionService);
  });

  describe('isGrantMatchesPermission', () => {
    it('should return false if different roots', () => {
      const grant = 'one';
      const permission = 'two';

      const result = permissionService.isGrantMatchesPermission(permission, grant);

      expect(result).toBe(false);
    });

    it('should return true if same roots and grant is generalised', () => {
      const grant = 'one.*';
      const permission = 'one.one';

      const result = permissionService.isGrantMatchesPermission(permission, grant);

      expect(result).toBe(true);
    });

    it('should return true if the same root and second part', () => {
      const grant = 'one.one';
      const permission = 'one.one';

      const result = permissionService.isGrantMatchesPermission(permission, grant);

      expect(result).toBe(true);
    });

    it('should return false if grant is bigger than permission', () => {
      const grant = 'one.two.three';
      const permission = 'one.two';

      const result = permissionService.isGrantMatchesPermission(permission, grant);

      expect(result).toBe(false);
    });

    it('should return true if generalisation inside the tree', () => {
      const grant = 'one.*.three';
      const permission = 'one.two.three';

      const result = permissionService.isGrantMatchesPermission(permission, grant);

      expect(result).toBe(true);
    });
  });

  describe('hasPermissionInRoles',  () => {
    it('should return false if no roles', async () => {
      const roles = [] as any;
      const permission = 'one';

      const result = await permissionService.hasPermissionInRoles(roles, permission);

      expect(result).toBe(false);
    });

    it('should return false if role with no grants', async () => {
      const roles = [{
        grants: [],
      }] as any;
      const permission = 'one';

      const result = await permissionService.hasPermissionInRoles(roles, permission);

      expect(result).toBe(false);
    });

    it('should return true if one of the roles without grants, but another contain grant with set', async () => {
      const roles = [{
        grants: [],
      }, {
        grants: [{
          permission: 'one',
          set: true,
        }],
      }] as any;
      const permission = 'one';

      const result = await permissionService.hasPermissionInRoles(roles, permission);

      expect(result).toBe(true);
    });

    it('should return true if set of grant in first role is true, but in second is false', async () => {
      const roles = [{
        grants: [{
          permission: 'one',
          set: true,
        }],
      }, {
        grants: [{
          permission: 'one',
          set: false,
        }],
      }] as any;
      const permission = 'one';

      const result = await permissionService.hasPermissionInRoles(roles, permission);

      expect(result).toBe(true);
    });

    it('should return false if set of grant in first role is false, but in second is true', async () => {
      const roles = [{
        grants: [{
          permission: 'one',
          set: false,
        }],
      }, {
        grants: [{
          permission: 'one',
          set: true,
        }],
      }] as any;
      const permission = 'one';

      const result = await permissionService.hasPermissionInRoles(roles, permission);

      expect(result).toBe(false);
    });

    it('should return true if no grant with this permission in first role, but in second is true', async () => {
      const roles = [{
        grants: [{
          permission: 'two',
          set: false,
        }],
      }, {
        grants: [{
          permission: 'one',
          set: true,
        }],
      }] as any;
      const permission = 'one';

      const result = await permissionService.hasPermissionInRoles(roles, permission);

      expect(result).toBe(true);
    });

    it('should return false if no grant with this permission in first role, but in second is false', async () => {
      const roles = [{
        grants: [{
          permission: 'two',
          set: false,
        }],
      }, {
        grants: [{
          permission: 'one',
          set: false,
        }],
      }] as any;
      const permission = 'one';

      const result = await permissionService.hasPermissionInRoles(roles, permission);

      expect(result).toBe(false);
    });

    it('should return false if no grants with this permission in both roles', async () => {
      const roles = [{
        grants: [{
          permission: 'two',
          set: false,
        }],
      }, {
        grants: [{
          permission: 'two',
          set: true,
        }],
      }] as any;
      const permission = 'one';

      const result = await permissionService.hasPermissionInRoles(roles, permission);

      expect(result).toBe(false);
    });
  });
});