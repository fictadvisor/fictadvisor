import { PERMISSION } from '@fictadvisor/utils/security';
import { AxiosResponse } from 'axios';

import { client } from '@/lib/api/instance';
import { User } from '@/types/user';

import createPermissionRequest from './utils/createPermissionRequest';
import { PermissionData, PermissionResponse } from './types';

class PermissionService {
  async getPermissionList(userId: User['id'], values: PermissionData) {
    const body = createPermissionRequest(values);
    const response: AxiosResponse<PermissionResponse> = await client.post(
      `/permissions/check?userId=${userId}`,
      body,
    );
    return response.data;
  }

  async getAdminAccess(userId: User['id'], permissions: PERMISSION[]) {
    const body = {
      permissions,
      values: {
        userId,
      },
    };
    const response: AxiosResponse<PermissionResponse> = await client.post(
      `/permissions/check?userId=${userId}`,
      body,
    );
    return response.data;
  }
}

export default new PermissionService();
