import {
  ApproveStudentByTelegramDTO,
  CreateContactDTO,
  CreateSuperheroDTO,
  CreateUserDTO,
  GiveRoleDTO,
  GroupRequestDTO,
  QueryAllUsersDTO,
  RemainingSelectivesDTO,
  SelectiveDisciplinesDTO,
  TelegramDTO,
  UpdateStudentDTO,
  UpdateSuperheroDTO,
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
  SuperheroResponse,
  UserResponse,
  UsersResponse,
} from '@fictadvisor/utils/responses';

import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

class UserAPI {
  async getAll(params: QueryAllUsersDTO = {}): Promise<UsersResponse> {
    const { data } = await client.get<UsersResponse>(`/users`, {
      params,
      ...getAuthorizationHeader(),
    });
    return data;
  }

  async getUser(userId: string): Promise<UserResponse> {
    const { data } = await client.get<UserResponse>(
      `/users/${userId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async delete(userId: string): Promise<void> {
    await client.delete(`/users/${userId}`, getAuthorizationHeader());
  }

  async create(body: CreateUserDTO) {
    const { data } = await client.post<UserResponse>(
      `/users`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editUser(userId: string, body: UpdateUserDTO) {
    const { data } = await client.patch<UserResponse>(
      `/users/${userId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async changeInfo(userId: string, body: UpdateStudentDTO) {
    const { data } = await client.patch<OrdinaryStudentResponse>(
      `/users/${userId}/student`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async linkTelegram(userId: string, body: TelegramDTO) {
    const { data } = await client.post<OrdinaryStudentResponse>(
      `/users/${userId}/telegram`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async addContact(userId: string, body: CreateContactDTO) {
    const { data } = await client.post<ContactResponse>(
      `/users/${userId}/contacts`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getContacts(userId: string): Promise<ContactsResponse> {
    const { data } = await client.get<ContactsResponse>(
      `/users/${userId}/contacts`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async deleteContact(userId: string, contactId: string): Promise<void> {
    await client.delete(
      `/users/${userId}/contacts/${contactId}`,
      getAuthorizationHeader(),
    );
  }

  async requestNewGroup(userId: string, body: GroupRequestDTO): Promise<void> {
    await client.patch(
      `/users/${userId}/requestNewGroup`,
      body,
      getAuthorizationHeader(),
    );
  }

  async getSelectiveDisciplinesBySemester(userId: string) {
    const { data } = await client.get<SelectivesBySemestersResponse>(
      `/users/${userId}/selectiveBySemesters`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async postSelectiveDisciplines(
    userId: string,
    body: SelectiveDisciplinesDTO,
  ): Promise<void> {
    await client.post(
      `/users/${userId}/selectiveDisciplines`,
      body,
      getAuthorizationHeader(),
    );
  }

  async getSelectiveDisciplines(
    userId: string,
    params: RemainingSelectivesDTO,
  ) {
    const { data } = await client.get<RemainingSelectivesResponse>(
      `/users/${userId}/remainingSelectives`,
      { ...getAuthorizationHeader(), params },
    );
    return data;
  }

  async changeAvatar(userId: string, body: FormData) {
    const { data } = await client.patch<UserResponse>(
      `/users/${userId}/avatar`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async setRole(userId: string, body: GiveRoleDTO): Promise<void> {
    await client.post(`/users/${userId}/roles`, body, getAuthorizationHeader());
  }

  async getSelective(userId: string) {
    const { data } = await client.get<DisciplineIdsResponse>(
      `/users/${userId}/selectiveDisciplines`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async postSuperhero(userId: string, body: CreateSuperheroDTO) {
    const { data } = await client.post<SuperheroResponse>(
      `/users/${userId}/superhero`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async verifySuperhero(userId: string, body: UpdateSuperheroDTO) {
    const { data } = await client.patch<SuperheroResponse>(
      `/users/${userId}/verifySuperhero`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async verifyStudent(userId: string, body: ApproveStudentByTelegramDTO) {
    const { data } = await client.patch<FullStudentResponse>(
      `/users/${userId}/verifyStudent`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new UserAPI();
