import { StudentService } from '../../src/modules/student/v2/student.service';
import { UserService } from '../../src/modules/user/v2/user.service';
import { GroupRoles } from '@fictadvisor/utils/enums';
import { RoleName } from '@prisma-client/fictadvisor';

const OLD_GROUP = 'old-group';
const NEW_GROUP = 'new-group';
const STUDENT = 'student-1';

// Moving a student to another group and promoting them to captain in the same
// request used to fail: the role switch ran before the move was persisted, so
// `switchCaptain` checked the student against the group they were leaving.
describe('promoting a student to captain while moving them to another group', () => {
  const build = () => {
    const writes: any[] = [];
    const service: any = Object.create(StudentService.prototype);

    let groupId = OLD_GROUP;

    service.studentRepository = {
      findOne: async () => ({ userId: STUDENT, groupId, roles: [{ role: { name: RoleName.STUDENT } }] }),
      updateById: async (userId: string, data: any) => {
        writes.push(data);
        if (data.groupId) groupId = data.groupId;
        return { userId, groupId };
      },
    };

    service.groupService = {
      switchCaptain: async (targetGroup: string) => {
        // Mirrors the real `isStudentInGroup` check.
        const { groupId: current } = await service.studentRepository.findOne();
        if (current !== targetGroup) throw new Error('student is not in the group');
        writes.push({ captainOf: targetGroup });
      },
    };

    return { service, writes, currentGroup: () => groupId };
  };

  it('persists the move before switching the captain', async () => {
    const { service, writes, currentGroup } = build();

    await service.updateStudent(STUDENT, { groupId: NEW_GROUP, roleName: GroupRoles.CAPTAIN });

    expect(currentGroup()).toBe(NEW_GROUP);
    // The move lands first, the promotion second — and it targets the new group.
    expect(writes[0].groupId).toBe(NEW_GROUP);
    expect(writes[1]).toEqual({ captainOf: NEW_GROUP });
  });

  it('clears the selectives of the group being left', async () => {
    const { service, writes } = build();

    await service.updateStudent(STUDENT, { groupId: NEW_GROUP, roleName: GroupRoles.CAPTAIN });

    expect(writes[0].selectiveDisciplines).toEqual({ deleteMany: { studentId: STUDENT } });
  });
});

// `changeGroupRole` used to read the target group off whichever group role the
// student happened to hold, which is the group they are leaving mid-move.
describe('UserService.changeGroupRole', () => {
  const build = ({ studentGroup, heldRoleId }: any) => {
    const given: any[] = [];
    const removed: any[] = [];
    const service: any = Object.create(UserService.prototype);

    service.studentRepository = { findOne: async () => ({ userId: STUDENT, groupId: studentGroup }) };
    service.roleRepository = {
      findOne: async (where: any) => ({ id: `${where.groupRole.groupId}:${where.name}` }),
    };
    service.getGroupRole = async () => (heldRoleId ? { id: heldRoleId } : null);
    service.removeRole = async (_s: string, roleId: string) => removed.push(roleId);
    service.giveRole = async (_s: string, roleId: string) => given.push(roleId);

    return { service, given, removed };
  };

  it('resolves the role from the group the student is in, not the one their role is in', async () => {
    const { service, given, removed } = build({
      studentGroup: NEW_GROUP,
      heldRoleId: `${OLD_GROUP}:STUDENT`,
    });

    await service.changeGroupRole(STUDENT, RoleName.CAPTAIN);

    expect(given).toEqual([`${NEW_GROUP}:CAPTAIN`]);
    expect(removed).toEqual([`${OLD_GROUP}:STUDENT`]);
  });

  it('gives a role to a student who holds none', async () => {
    const { service, given, removed } = build({ studentGroup: NEW_GROUP, heldRoleId: null });

    await service.changeGroupRole(STUDENT, RoleName.STUDENT);

    expect(given).toEqual([`${NEW_GROUP}:STUDENT`]);
    expect(removed).toEqual([]);
  });

  it('does nothing when the student already holds that role', async () => {
    const { service, given, removed } = build({
      studentGroup: NEW_GROUP,
      heldRoleId: `${NEW_GROUP}:CAPTAIN`,
    });

    await service.changeGroupRole(STUDENT, RoleName.CAPTAIN);

    expect(given).toEqual([]);
    expect(removed).toEqual([]);
  });
});
