import { ChangeInfoBody } from '@/lib/api/user/dto/ChangeInfoBody';
import { LinkTelegramBody } from '@/lib/api/user/dto/LinkTelegramBody';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { AddByMailBody } from './dto/AddByMailBody';
import { AddContactBody } from './dto/AddContactBody';
import { CreateRoleUserBody } from './dto/CreateRoleUserBody';
import { DeleteRoleUserBody } from './dto/DeleteRoleUserBody';

export class UserAPI {
  static async changeInfo(userId: string, body: ChangeInfoBody) {
    const { data } = await client.patch(
      `/users/${userId}/student`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async linkTelegram(userId: string, body: LinkTelegramBody) {
    const { data } = await client.post(
      `/users/${userId}/telegram`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async addByMailBody(body: AddByMailBody) {
    const { data } = await client.post(
      '/users',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async addContactBody(body: AddContactBody) {
    const { data } = await client.post(
      '/users/contacts',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async createRoleUserBody(userId: string, body: CreateRoleUserBody) {
    const { data } = await client.post(
      `/users/${userId}/roles`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async deleteRole(
    body: DeleteRoleUserBody,
    userId: string,
    roleId: string,
  ) {
    const { data } = await client.delete(
      `/users/${userId}/roles/${roleId}`,
      getAuthorizationHeader(),
    );
    return data;
  }
}
