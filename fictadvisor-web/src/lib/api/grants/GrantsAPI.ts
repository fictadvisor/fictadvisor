import { GrantsSearchFormFields } from '@/components/pages/admin/admin-grants/common/types';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { Grant } from '@/types/role';

import { client } from '../instance';

import { CreateGrantBody } from './types/CreateGrantBody';
import { GetAllGrantsResponse } from './types/GetAllGrantsResponse';

class GrantsAPI {
  async getAllByRoleId(
    roleId: string,
    params: Partial<GrantsSearchFormFields> = {},
    page?: number,
    pageSize?: number,
  ) {
    const set =
      params.set === 'given'
        ? false
        : params.set === 'taken'
          ? true
          : undefined;
    const { data } = await client.get<GetAllGrantsResponse>(
      `/roles/${roleId}/grants`,

      {
        params: {
          ...params,
          set: set,
          page,
          pageSize,
        },
        ...getAuthorizationHeader(),
      },
    );
    return data;
  }

  async getByGrantId(roleId: string, grantId: string) {
    const { data } = await client.get<Grant>(
      `/roles/${roleId}/grants/${grantId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async delete(roleId: string, grantId: string) {
    const { data } = await client.delete(
      `/roles/${roleId}/grants/${grantId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async edit(roleId: string, grantId: string, body: Partial<CreateGrantBody>) {
    const { data } = await client.patch(
      `/roles/${roleId}/grants/${grantId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async create(roleId: string, body: CreateGrantBody) {
    const { data } = await client.post(
      `/roles/${roleId}/grant`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new GrantsAPI();
