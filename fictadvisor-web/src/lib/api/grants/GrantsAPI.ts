import {
  CreateGrantDTO,
  QueryAllGrantsDTO,
  UpdateGrantDTO,
} from '@fictadvisor/utils/requests';
import { GrantResponse, GrantsResponse } from '@fictadvisor/utils/responses';

import { GrantSet } from '@/app/admin/roles/[roleId]/grants/common/types';

import { client } from '../instance';

class GrantsAPI {
  async getAllByRoleId(
    roleId: string,
    params: QueryAllGrantsDTO = {},
    grantSet?: GrantSet,
  ) {
    const set = grantSet && grantSet === 'taken';
    const { data } = await client.get<GrantsResponse>(
      `/roles/${roleId}/grants`,
      {
        params: {
          ...params,
          set,
        },
      },
    );
    return data;
  }

  async getByGrantId(roleId: string, grantId: string) {
    const { data } = await client.get<GrantResponse>(
      `/roles/${roleId}/grants/${grantId}`,
    );
    return data;
  }

  async delete(roleId: string, grantId: string) {
    const { data } = await client.delete<GrantResponse>(
      `/roles/${roleId}/grants/${grantId}`,
    );
    return data;
  }

  async edit(roleId: string, grantId: string, body: UpdateGrantDTO) {
    const { data } = await client.patch<GrantResponse>(
      `/roles/${roleId}/grants/${grantId}`,
      body,
    );
    return data;
  }

  async create(roleId: string, body: CreateGrantDTO) {
    const { data } = await client.post<GrantResponse>(
      `/roles/${roleId}/grant`,
      body,
    );
    return data;
  }
}

export default new GrantsAPI();
