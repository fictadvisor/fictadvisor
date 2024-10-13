import { CheckPermissionsDTO } from '@fictadvisor/utils/requests';
import { CheckPermissionsResponse } from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';

class PermissionApi {
  async check(body: CheckPermissionsDTO): Promise<CheckPermissionsResponse> {
    const { data } = await client.post<CheckPermissionsResponse>(
      '/permissions/check',
      body,
    );
    return data;
  }
}

export default new PermissionApi();
