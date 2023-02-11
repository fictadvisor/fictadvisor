import { client, getAuthorizationHeader } from '../index';

import { addByMailBody } from './dto/addByMailBody';
import { addContactBody } from './dto/addContactBody';
import { CreateRoleUserBody } from './dto/CreateRoleUserBody';
import { DeleteRoleUserBody } from './dto/DeleteRoleUserBody';
export class UserAPI {
  static async addByMailBody(accessToken: string, body: addByMailBody) {
    return (
      await client.post('/users', body, getAuthorizationHeader(accessToken))
    ).data;
  }

  static async addContactBody(accessToken: string, body: addContactBody) {
    return (
      await client.post(
        '/users/contacts',
        body,
        getAuthorizationHeader(accessToken),
      )
    ).data;
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
