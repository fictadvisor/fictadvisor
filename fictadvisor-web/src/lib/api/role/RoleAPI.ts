import {
  CreateRoleDTO,
  QueryAllRolesDTO,
  UpdateRoleDTO,
} from '@fictadvisor/utils/requests';
import {
  BaseRoleResponse,
  RoleResponse,
  RolesResponse,
} from '@fictadvisor/utils/responses';

import { getAuthorizationHeader } from '@/lib/api/utils';
import { convertEmptyStringToUndefined } from '@/lib/utils/convertEmptyStringToUndefined';

import { client } from '../instance';

class RoleAPI {
  async getAll(params: QueryAllRolesDTO = {}): Promise<RolesResponse> {
    const { data } = await client.get<RolesResponse>(`/roles`, {
      params: convertEmptyStringToUndefined(params),
      ...getAuthorizationHeader(),
    });
    return data;
  }

  async getById(roleId: string): Promise<RoleResponse> {
    const { data } = await client.get<RoleResponse>(`/roles/${roleId}`, {
      ...getAuthorizationHeader(),
    });
    return data;
  }

  async delete(roleId: string) {
    const { data } = await client.delete<BaseRoleResponse>(
      `/roles/${roleId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async create(body: CreateRoleDTO) {
    const { data } = await client.post<BaseRoleResponse>(
      '/roles',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async edit(roleId: string, body: UpdateRoleDTO) {
    const { data } = await client.patch<BaseRoleResponse>(
      `/roles/${roleId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new RoleAPI();
