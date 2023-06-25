import { ChangeInfoBody } from '@/lib/api/user/dto/ChangeInfoBody';
import { GetContactsDTO } from '@/lib/api/user/dto/GetContactsDTO';
import { GetSelectiveDisciplinesBySemesterDTO } from '@/lib/api/user/dto/GetSelectiveDisciplinesBySemesterDTO';
import { GetSelectiveDisciplinesDTO } from '@/lib/api/user/dto/GetSelectiveDisciplinesDTO';
import { LinkTelegramBody } from '@/lib/api/user/dto/LinkTelegramBody';
import { PostSelectiveDisciplinesBody } from '@/lib/api/user/dto/PostSelectiveDisciplinesBody';
import { RequestNewGroupBody } from '@/lib/api/user/dto/RequestNewGroupBody';
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

  static async addContact(userId: string, body: AddContactBody) {
    const { data } = await client.post(
      `/users/${userId}/contacts`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getContacts(userId: string): Promise<GetContactsDTO> {
    const { data } = await client.get(
      `/users/${userId}/contacts`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async deleteContact(userId: string, contactName: string) {
    const { data } = await client.delete(
      `/users/${userId}/contacts/${contactName}`,
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

  static async requestNewGroup(body: RequestNewGroupBody, userId: string) {
    const { data } = await client.patch(
      `/users/${userId}/requestNewGroup`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getSelectiveDisciplinesBySemester(
    userId: string,
  ): Promise<GetSelectiveDisciplinesBySemesterDTO> {
    const { data } = await client.get(
      `/users/${userId}/selectiveBySemesters`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async postSelectiveDisciplines(
    userId: string,
    body: PostSelectiveDisciplinesBody,
  ) {
    const { data } = await client.post(
      `/disciplines/${userId}/selectiveDisciplines`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getSelectiveDisciplines(
    userId: string,
    year: number,
    semester: number,
  ): Promise<GetSelectiveDisciplinesDTO> {
    const { data } = await client.get(
      `/users/${userId}/selectiveDisciplines?`,
      { ...getAuthorizationHeader(), params: { year, semester } },
    );
    return data;
  }
}
