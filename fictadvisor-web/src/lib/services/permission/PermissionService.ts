import {
  CheckPermissionsDTO,
  PermissionValuesDTO,
} from '@fictadvisor/utils/requests';
import { PERMISSION } from '@fictadvisor/utils/security';

import { client } from '@/lib/api/instance';

import createPermissionRequest from './utils/createPermissionRequest';
import { PermissionResponse } from './types';

class PermissionService {
  async getPermissionList(userId: string, values: PermissionValuesDTO) {
    const body = createPermissionRequest(values);
    const { data } = await client.post<PermissionResponse>(
      `/permissions/check?userId=${userId}`,
      body,
    );
    return data;
  }

  async getAdminAccess(permissions: PERMISSION[]) {
    const body: CheckPermissionsDTO = {
      permissions,
    };
    const { data } = await client.post<PermissionResponse>(
      '/permissions/check',
      body,
    );
    return data;
  }
}

export default new PermissionService();
