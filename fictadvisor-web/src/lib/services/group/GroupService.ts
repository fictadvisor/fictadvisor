import { GroupRoles } from '@fictadvisor/utils/enums';
import { PermissionValuesDTO } from '@fictadvisor/utils/requests';
import { OrdinaryStudentResponse } from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';

import GroupAPI from '@/lib/api/group/GroupAPI';
import PermissionService from '@/lib/services/permission/PermissionService';
import { User } from '@/types/user';

import { Order } from './types/OrderEnum';

class GroupService {
  Order;
  constructor() {
    this.Order = Order;
  }
  async getStudents(user: User, order: Order) {
    const groupId = user.group?.id as string;
    const isStudent = user.group?.role === GroupRoles.STUDENT;
    const { students } = await GroupAPI.getGroupStudents(groupId, { order });
    const requests: OrdinaryStudentResponse[] = isStudent
      ? []
      : (await GroupAPI.getRequestStudents(groupId)).students;
    return {
      students,
      requests,
    };
  }
  getGroupData = async (user: User, order: Order) => {
    const groupId = user.group?.id as string;
    const permissionValues: PermissionValuesDTO = {
      groupId: groupId,
    };
    const permissions = await PermissionService.getPermissionList(
      user.id,
      permissionValues,
    );
    const { students } = await GroupAPI.getGroupStudents(groupId, { order });
    const requests: OrdinaryStudentResponse[] = !permissions[
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
