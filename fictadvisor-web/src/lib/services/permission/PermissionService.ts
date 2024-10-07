import { CheckPermissionsDTO } from '@fictadvisor/utils/requests';

import { client } from '@/lib/api/instance';

import { PermissionResponse } from './types';

class PermissionService {
  async check(body: CheckPermissionsDTO) {
    const { data } = await client.post<PermissionResponse>(
      '/permissions/check',
      body,
    );
    return data;
  }
}

export default new PermissionService();
