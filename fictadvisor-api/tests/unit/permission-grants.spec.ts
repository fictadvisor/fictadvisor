import { PermissionService } from '../../src/modules/permission/v2/permission.service';

const GROUP = 'GID-42';
const CAPTAIN = 'captain-user';
const STUDENT = 'student-user';

// Grants as ROLE_LIST creates them, ordered by weight desc the way the
// repository returns them.
const captainGrants = (leaveSet: boolean) => [
  { id: 'g1', permission: `groups.${GROUP}.leave`, set: leaveSet, weight: 2 },
  { id: 'g2', permission: `groups.${GROUP}.*`, set: true, weight: 1 },
];

const studentGrants = () => [
  { id: 'g3', permission: `groups.${GROUP}.students.get`, set: true, weight: 4 },
  { id: 'g4', permission: `groups.${GROUP}.students.*`, set: false, weight: 3 },
  { id: 'g5', permission: `groups.${GROUP}.*`, set: true, weight: 1 },
];

const permissionService = (grants: any[], roleOverrides: any = {}) => {
  const roleRepository = {
    findMany: async () => [{ id: 'r1', parentId: null, grants, ...roleOverrides }],
    findOne: async (where: any) => ({
      id: where.id,
      parentId: null,
      grants: roleOverrides.parentGrants ?? [],
    }),
  };
  return new PermissionService(roleRepository as any);
};

describe('captain leaving a group', () => {
  it('the leave permission is denied for a captain of a studying group', async () => {
    const service = permissionService(captainGrants(false));
    await expect(service.hasPermission(CAPTAIN, `groups.${GROUP}.leave`))
      .resolves.toBe(false);
  });

  it('the wildcard still grants the captain everything else', async () => {
    const service = permissionService(captainGrants(false));
    await expect(service.hasPermission(CAPTAIN, `groups.${GROUP}.list.get`))
      .resolves.toBe(true);
  });

  it('the leave permission is granted once the group has graduated', async () => {
    const service = permissionService(captainGrants(true));
    await expect(service.hasPermission(CAPTAIN, `groups.${GROUP}.leave`))
      .resolves.toBe(true);
  });

  it('ordinary students keep the leave permission', async () => {
    const service = permissionService(studentGrants());
    await expect(service.hasPermission(STUDENT, `groups.${GROUP}.leave`))
      .resolves.toBe(true);
  });
});

// Regression test: grants inherited from a parent role used to be pushed after
// the match had already been looked up, because the recursive walk was fired off
// unawaited. Any permission that only a parent granted resolved to false.
describe('inherited grants', () => {
  it('a grant that only the parent role carries is honoured', async () => {
    const roleRepository = {
      findMany: async () => [{ id: 'child', parentId: 'parent', grants: [] }],
      findOne: async () => ({
        id: 'parent',
        parentId: null,
        grants: [{ id: 'p1', permission: `groups.${GROUP}.*`, set: true, weight: 1 }],
      }),
    };
    const service = new PermissionService(roleRepository as any);
    await expect(service.hasPermission(CAPTAIN, `groups.${GROUP}.leave`))
      .resolves.toBe(true);
  });

  it('a grant on the child role still overrides the parent grant', async () => {
    const roleRepository = {
      findMany: async () => [{
        id: 'child',
        parentId: 'parent',
        grants: [{ id: 'c1', permission: `groups.${GROUP}.leave`, set: false, weight: 2 }],
      }],
      findOne: async () => ({
        id: 'parent',
        parentId: null,
        grants: [{ id: 'p1', permission: `groups.${GROUP}.*`, set: true, weight: 1 }],
      }),
    };
    const service = new PermissionService(roleRepository as any);
    await expect(service.hasPermission(CAPTAIN, `groups.${GROUP}.leave`))
      .resolves.toBe(false);
  });
});
