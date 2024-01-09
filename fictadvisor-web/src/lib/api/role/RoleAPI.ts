import { RolesSearchFormFields } from '@/components/pages/admin/admin-roles/common/types/HeaderRolesSearch';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { convertEmptyStringToUndefined } from '@/lib/utils/convertEmptyStringToUndefined';
import { Role } from '@/types/role';

import { client } from '../instance';

import { CreateRoleBody } from './types/CreateRoleBody';
import { GetAllRolesResponse } from './types/GetAllResponse';

class RoleAPI {
  async getAll(
    page: number,
    params: Partial<RolesSearchFormFields> = {},
    pageSize?: number,
  ): Promise<GetAllRolesResponse> {
    const { data } = await client.get(`/roles`, {
      params: {
        ...convertEmptyStringToUndefined(params),
        page,
        pageSize,
      },
      ...getAuthorizationHeader(),
    });
    return data;
  }

  async getById(roleId: string): Promise<Role> {
    const { data } = await client.get(`/roles/${roleId}`, {
      ...getAuthorizationHeader(),
    });
    return data;
  }

  async delete(roleId: string) {
    const { data } = await client.delete(
      `/roles/${roleId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async create(body: CreateRoleBody) {
    const { data } = await client.post(
      '/roles',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async edit(body: Partial<CreateRoleBody>, roleId: string) {
    const { data } = await client.patch(
      `/roles/${roleId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new RoleAPI();
