import { PERMISSION } from '@fictadvisor/utils/security';

import GroupAPI from '@/lib/api/group/GroupAPI';
import PermissionService from '@/lib/services/permisson/PermissionService';
import { PermissionData } from '@/lib/services/permisson/types';
import { PendingStudent } from '@/types/student';
import { User } from '@/types/user';
import { UserGroupRole } from '@/types/user';

import { Order } from './types/OrderEnum';
class GroupService {
  Order;
  constructor() {
    this.Order = Order;
  }
  async getStudents(user: User, order: Order) {
    const groupId = user.group?.id as string;
    const isStudent = user.group?.role === UserGroupRole.STUDENT;
    const { students } = await GroupAPI.getGroupStudents(groupId, order);
    const requests: PendingStudent[] = isStudent
      ? []
      : (await GroupAPI.getRequestStudents(groupId)).students;
    return {
      students,
      requests,
    };
  }
  getGroupData = async (user: User, order: Order) => {
    const groupId = user.group?.id as string;
    const permissionValues: PermissionData = {
      groupId: groupId,
    };
    const permissions = await PermissionService.getPermissionList(
      user.id,
      permissionValues,
    );
    const { students } = await GroupAPI.getGroupStudents(groupId, order);
    const requests: PendingStudent[] = !permissions[
      PERMISSION.GROUPS_$GROUPID_STUDENTS_UNVERIFIED_GET
    ]
      ? []
      : (await GroupAPI.getRequestStudents(groupId, order)).students;

    return {
      students,
      requests,
      permissions,
    };
  };
}
export default new GroupService();
