import {
  ApproveDTO,
  CreateGroupDTO,
  EmailDTO,
  GroupStudentsQueryDTO,
  QueryAllGroupsDTO,
  QuerySemesterDTO,
  RoleDTO,
  SwitchCaptainDTO,
  UpdateGroupDTO,
} from '@fictadvisor/utils/requests';
import {
  ExtendedDisciplineTeachersResponse,
  GroupStudentsResponse,
  MappedGroupResponse,
  OrdinaryStudentResponse,
  PaginatedGroupsResponse,
  SelectiveDisciplinesWithAmountResponse,
  ShortDisciplinesResponse,
  ShortUsersResponse,
  StudentsResponse,
  URLResponse,
} from '@fictadvisor/utils/responses';

import { getAuthorizationHeader } from '@/lib/api/utils';

import { Order } from '../../services/group/types/OrderEnum';
import { client } from '../instance';

class GroupAPI {
  async addStudentsByMail(groupId: string, body: EmailDTO) {
    const { data } = await client.post<ShortUsersResponse>(
      `/groups/${groupId}/addEmails`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async get(groupId: string) {
    const { data } = await client.get<MappedGroupResponse>(
      `/groups/${groupId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getAll(params: QueryAllGroupsDTO = {}) {
    const { data } = await client.get<PaginatedGroupsResponse>(`/groups`, {
      params,
      ...getAuthorizationHeader(),
    });
    return data;
  }

  async create(body: CreateGroupDTO) {
    const { data } = await client.post<MappedGroupResponse>(
      `/groups`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  // HERE I STOPPED
  async editGroup(groupId: string, body: UpdateGroupDTO) {
    const { data } = await client.patch<MappedGroupResponse>(
      `/groups/${groupId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async delete(groupId: string) {
    const { data } = await client.delete<MappedGroupResponse>(
      `/groups/${groupId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getGroupStudents(groupId: string, params: GroupStudentsQueryDTO = {}) {
    const { data } = await client.get<GroupStudentsResponse>(
      `/groups/${groupId}/students`,
      {
        params,
        ...getAuthorizationHeader(),
      },
    );
    return data;
  }

  async getRequestStudents(groupId: string, order?: Order) {
    const params = order ? { order, sort: 'lastName' } : {};
    const { data } = await client.get<StudentsResponse>(
      `/groups/${groupId}/unverifiedStudents`,
      {
        params,
        ...getAuthorizationHeader(),
      },
    );

    return data;
  }

  async removeStudent(groupId: string, studentId: string): Promise<void> {
    await client.delete(
      `/groups/${groupId}/remove/${studentId}`,
      getAuthorizationHeader(),
    );
  }

  async updateStudentRole(
    groupId: string,
    studentId: string,
    body: RoleDTO,
  ): Promise<void> {
    await client.patch(
      `/groups/${groupId}/switch/${studentId}`,
      body,
      getAuthorizationHeader(),
    );
  }

  async updateCaptain(groupId: string, body: SwitchCaptainDTO) {
    const { data } = await client.post<OrdinaryStudentResponse>(
      `/groups/${groupId}/switchCaptain`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async verifyStudent(groupId: string, userId: string, body: ApproveDTO) {
    const { data } = await client.patch<OrdinaryStudentResponse>(
      `/groups/${groupId}/verify/${userId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getDisciplines(groupId: string, params: QuerySemesterDTO) {
    const { data } = await client.get<ShortDisciplinesResponse>(
      `/groups/${groupId}/disciplines`,
      {
        params,
        ...getAuthorizationHeader(),
      },
    );

    return data;
  }

  async getDisciplineTeachers(groupId: string) {
    const { data } = await client.get<ExtendedDisciplineTeachersResponse>(
      `/groups/${groupId}/disciplineTeachers`,
      getAuthorizationHeader(),
    );

    return data;
  }

  async getGroupListUrl(groupId: string) {
    const { data } = await client.get<URLResponse>(
      `/groups/${groupId}/list`,
      getAuthorizationHeader(),
    );

    return data;
  }

  async leaveGroup(groupId: string) {
    const { data } = await client.patch<OrdinaryStudentResponse>(
      `/groups/${groupId}/leave`,
      {},
      getAuthorizationHeader(),
    );
    return data;
  }

  async getSelectives(groupId: string) {
    const { data } = await client.get<SelectiveDisciplinesWithAmountResponse[]>(
      `/groups/${groupId}/selectiveDisciplines`,
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new GroupAPI();
