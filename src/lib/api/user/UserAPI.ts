import { AddContactBody } from '@/lib/api/user/types/AddContactBody';
import { ChangeInfoBody } from '@/lib/api/user/types/ChangeInfoBody';
import { GetContactsResponse } from '@/lib/api/user/types/GetContactsResponse';
import { GetSelectiveDisciplinesBySemesterResponse } from '@/lib/api/user/types/GetSelectiveDisciplinesBySemesterResponse';
import { GetSelectiveDisciplinesResponse } from '@/lib/api/user/types/GetSelectiveDisciplinesResponse';
import { PostSelectiveDisciplinesBody } from '@/lib/api/user/types/PostSelectiveDisciplinesBody';
import { RequestNewGroupBody } from '@/lib/api/user/types/RequestNewGroupBody';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { TelegramUser } from '@/types/telegram';

import { client } from '../instance';

class UserAPI {
  async changeInfo(userId: string, body: ChangeInfoBody) {
    const { data } = await client.patch(
      `/users/${userId}/student`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async linkTelegram(userId: string, body: TelegramUser) {
    const { data } = await client.post(
      `/users/${userId}/telegram`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async addContact(userId: string, body: AddContactBody) {
    const { data } = await client.post(
      `/users/${userId}/contacts`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getContacts(userId: string): Promise<GetContactsResponse> {
    const { data } = await client.get(
      `/users/${userId}/contacts`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async deleteContact(userId: string, contactName: string) {
    const { data } = await client.delete(
      `/users/${userId}/contacts/${contactName}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async requestNewGroup(body: RequestNewGroupBody, userId: string) {
    const { data } = await client.patch(
      `/users/${userId}/requestNewGroup`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getSelectiveDisciplinesBySemester(userId: string) {
    const { data } =
      await client.get<GetSelectiveDisciplinesBySemesterResponse>(
        `/users/${userId}/selectiveBySemesters`,
        getAuthorizationHeader(),
      );
    return data;
  }

  async postSelectiveDisciplines(
    userId: string,
    body: PostSelectiveDisciplinesBody,
  ) {
    const { data } = await client.post(
      `/users/${userId}/selectiveDisciplines`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getSelectiveDisciplines(
    userId: string,
    year: number,
    semester: number,
  ) {
    const { data } = await client.get<GetSelectiveDisciplinesResponse>(
      `/users/${userId}/selectiveDisciplines?`,
      { ...getAuthorizationHeader(), params: { year, semester } },
    );
    return data;
  }

  async deleteUserRolesInfo(userId: string, roleId: string) {
    const { data } = await client.delete(
      `/users/${userId}/roles/${roleId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async deleteUserInfo(userId: string) {
    const { data } = await client.delete(
      `/users/${userId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async changeUserInfo(userId: string, body: ChangeInfoBody) {
    const { data } = await client.patch(
      `/users/${userId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getUserInfo(userId: string) {
    const { data } = await client.get(
      `/users/${userId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async changeUserContactInfo(
    userId: string,
    contactId: string,
    body: ChangeInfoBody,
  ) {
    const { data } = await client.patch(
      `/users/${userId}/contacts/${contactId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async deleteUserStudent(userId: string) {
    const { data } = await client.delete(
      `/v2/users/${userId}/student`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getUserTelegram(userId: string) {
    const { data } = await client.get(
      `/v2/users/${userId}/telegram`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getTelegramUser(telegramId: string) {
    const { data } = await client.get(
      `/v2/users/telegramUser/${telegramId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async changeUserAvatar(userId: string, avatar: string) {
    const { data } = await client.patch(
      `/v2/users/${userId}/avatar`,
      avatar,
      getAuthorizationHeader(),
    );
    return data;
  }

  async changeUserGroup(userId: string, groupId: string) {
    const { data } = await client.patch(
      `/v2/users/${userId}/group/${groupId}`,
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new UserAPI();
