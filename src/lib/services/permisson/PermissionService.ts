import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

import { PERMISSION } from './types';

const MIN_MARKS_LENGTH = 8;

class PermissionService {
  async getPermisson(
    permissions: PERMISSION[],
    userId: string | undefined,
    groupId: string | undefined,
    $roleId: string | undefined,
    $teacherId: string | undefined,
  ): Promise<boolean> {
    const hasPermission = true;
    return hasPermission;
  }
}

export default new PermissionService();
