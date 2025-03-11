import {
  ApproveStudentByTelegramDTO,
  CreateContactDTO,
  CreateUserDTO,
  GiveRoleDTO,
  GroupRequestDTO,
  QueryAllUsersDTO,
  RemainingSelectivesDTO,
  SelectiveDisciplinesDTO,
  TelegramDTO,
  UpdateStudentDTO,
  UpdateUserDTO,
} from '@fictadvisor/utils/requests';
import {
  ContactResponse,
  ContactsResponse,
  DisciplineIdsResponse,
  FullStudentResponse,
  OrdinaryStudentResponse,
  RemainingSelectivesResponse,
  SelectivesBySemestersResponse,
  UserResponse,
  UsersResponse,
} from '@fictadvisor/utils/responses';

import { client } from '../instance';

class UserAPI {
  async getAll(params: QueryAllUsersDTO = {}): Promise<UsersResponse> {
    const { data } = await client.get<UsersResponse>(`/users`, {
      params,
    });
    return data;
  }

  async getUser(userId: string): Promise<UserResponse> {
    const { data } = await client.get<UserResponse>(`/users/${userId}`);
    return data;
  }

  async delete(userId: string): Promise<void> {
    await client.delete(`/users/${userId}`);
  }

  async create(body: CreateUserDTO) {
    const { data } = await client.post<UserResponse>(`/users`, body);
    return data;
  }

  async editUser(userId: string, body: UpdateUserDTO) {
    const { data } = await client.patch<UserResponse>(`/users/${userId}`, body);
    return data;
  }

  async changeInfo(userId: string, body: UpdateStudentDTO) {
    const { data } = await client.patch<OrdinaryStudentResponse>(
      `/users/${userId}/student`,
      body,
    );
    return data;
  }

  async linkTelegram(userId: string, body: TelegramDTO) {
    const { data } = await client.post<OrdinaryStudentResponse>(
      `/users/${userId}/telegram`,
      body,
    );
    return data;
  }

  async addContact(userId: string, body: CreateContactDTO) {
    const { data } = await client.post<ContactResponse>(
      `/users/${userId}/contacts`,
      body,
    );
    return data;
  }

  async getContacts(userId: string): Promise<ContactsResponse> {
    const { data } = await client.get<ContactsResponse>(
      `/users/${userId}/contacts`,
    );
    return data;
  }

  async deleteContact(userId: string, contactId: string): Promise<void> {
    await client.delete(`/users/${userId}/contacts/${contactId}`);
  }

  async requestNewGroup(userId: string, body: GroupRequestDTO): Promise<void> {
    await client.patch(`/users/${userId}/requestNewGroup`, body);
  }

  async getSelectiveDisciplinesBySemester(userId: string) {
    const { data } = await client.get<SelectivesBySemestersResponse>(
      `/users/${userId}/selectiveBySemesters`,
    );
    return data;
  }

  async postSelectiveDisciplines(
    userId: string,
    body: SelectiveDisciplinesDTO,
  ): Promise<void> {
    await client.post(`/users/${userId}/selectiveDisciplines`, body);
  }

  async getSelectiveDisciplines(
    userId: string,
    params: RemainingSelectivesDTO,
  ) {
    const { data } = await client.get<RemainingSelectivesResponse>(
      `/users/${userId}/remainingSelectives`,
      { params },
    );
    return data;
  }

  async changeAvatar(userId: string, body: FormData) {
    const { data } = await client.patch<UserResponse>(
      `/users/${userId}/avatar`,
      body,
    );
    return data;
  }

  async setRole(userId: string, body: GiveRoleDTO): Promise<void> {
    await client.patch(`/users/${userId}/roles`, body);
  }

  async getSelective(userId: string) {
    const { data } = await client.get<DisciplineIdsResponse>(
      `/users/${userId}/selectiveDisciplines`,
    );
    return data;
  }

  async verifyStudent(userId: string, body: ApproveStudentByTelegramDTO) {
    const { data } = await client.patch<FullStudentResponse>(
      `/users/${userId}/verifyStudent`,
      body,
    );
    return data;
  }
}

export default new UserAPI();
