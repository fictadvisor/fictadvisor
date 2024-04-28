import {
  CheckPermissionsDTO,
  PermissionValuesDTO,
} from '@fictadvisor/utils/requests';
import { PERMISSION } from '@fictadvisor/utils/security';

const createPermissionRequest = (
  values: PermissionValuesDTO,
): CheckPermissionsDTO => {
  const permissions: PERMISSION[] = [];
  for (const permission of Object.values(PERMISSION)) {
    if (permission.includes('$userId') && values.userId) {
      permissions.push(permission);
    }
    if (permission.includes('$groupId') && values.groupId) {
      permissions.push(permission);
    }
    if (permission.includes('$roleId') && values.roleId) {
      permissions.push(permission);
    }
    if (permission.includes('$teacherId') && values.teacherId) {
      permissions.push(permission);
    }
    if (!permission.includes('$')) {
      permissions.push(permission);
    }
  }

  return {
    permissions,
    values,
  };
};

export default createPermissionRequest;
