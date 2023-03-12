import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { CreateGrantBody } from './dto/CreateGrantBody';
import { CreateRoleBody } from './dto/CreateRoleBody';

export class SecurityAPI {
  static async roleDelete(roleId: string) {
    const { data } = await client.delete(
      `/roles/${roleId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async createRole(body: CreateRoleBody) {
    const { data } = await client.post(
      '/roles',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async createGrant(roleId: string, body: CreateGrantBody) {
    const { data } = await client.post(
      `/roles/${roleId}/grants`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async deleteGrant(grantId: string) {
    const { data } = await client.delete(
      `/grants/${grantId}`,
      getAuthorizationHeader(),
    );
    return data;
  }
}
