import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { AddByMailBody } from './dto/AddByMailBody';
import { AddContactBody } from './dto/AddContactBody';
import { CreateRoleUserBody } from './dto/CreateRoleUserBody';
import { DeleteRoleUserBody } from './dto/DeleteRoleUserBody';
export class UserAPI {
  static async addByMailBody(accessToken: string, body: addByMailBody) {
    return (
      await client.post('/users', body, getAuthorizationHeader(accessToken))
    ).data;
  }

  static async addContactBody(body: AddContactBody) {
    const { data } = await client.post(
      '/users/contacts',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async createRoleUserBody(
    accessToken: string,
    userId: string,
    body: CreateRoleUserBody,
  ) {
    return await client.post(
      `/users/${userId}/roles`,
      body,
      getAuthorizationHeader(accessToken),
    );
  }

  static async deleteRole(
    accessToken: string,
    body: DeleteRoleUserBody,
    userId: string,
    roleId: string,
  ) {
    return (
      await client.delete(
        `/users/${userId}/roles/${roleId}`,
        getAuthorizationHeader(accessToken),
      )
    ).data;
  }
}
