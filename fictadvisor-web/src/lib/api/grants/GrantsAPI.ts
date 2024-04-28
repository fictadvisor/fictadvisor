import {
  CreateGrantDTO,
  QueryAllGrantsDTO,
  UpdateGrantDTO,
} from '@fictadvisor/utils/requests';
import { GrantsResponse, MappedGrant } from '@fictadvisor/utils/responses';

import { GrantSet } from '@/app/admin/roles/[roleId]/grants/common/types';
import { getAuthorizationHeader } from '@/lib/api/utils';

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
        ...getAuthorizationHeader(),
      },
    );
    return data;
  }

  async getByGrantId(roleId: string, grantId: string) {
    const { data } = await client.get<MappedGrant>(
      `/roles/${roleId}/grants/${grantId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async delete(roleId: string, grantId: string) {
    const { data } = await client.delete<MappedGrant>(
      `/roles/${roleId}/grants/${grantId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async edit(roleId: string, grantId: string, body: UpdateGrantDTO) {
    const { data } = await client.patch<MappedGrant>(
      `/roles/${roleId}/grants/${grantId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async create(roleId: string, body: CreateGrantDTO) {
    const { data } = await client.post<MappedGrant>(
      `/roles/${roleId}/grant`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new GrantsAPI();
