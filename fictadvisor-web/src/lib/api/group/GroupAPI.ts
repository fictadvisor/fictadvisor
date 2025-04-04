import {
  ApproveDTO,
  CreateGroupDTO,
  EmailDTO,
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

import { Order } from '../../services/group/types/OrderEnum';
import { client } from '../instance';

class GroupAPI {
  async addStudentsByMail(groupId: string, body: EmailDTO) {
    const { data } = await client.post<ShortUsersResponse>(
      `/groups/${groupId}/addEmails`,
      body,
    );
    return data;
  }

  async get(groupId: string) {
    const { data } = await client.get<MappedGroupResponse>(
      `/groups/${groupId}`,
    );
    return data;
  }

  async getAll(params: QueryAllGroupsDTO = {}) {
    const { data } = await client.get<PaginatedGroupsResponse>(`/groups`, {
      params,
    });
    return data;
  }

  async create(body: CreateGroupDTO) {
    const { data } = await client.post<MappedGroupResponse>(`/groups`, body);
    return data;
  }

  // HERE I STOPPED
  async editGroup(groupId: string, body: UpdateGroupDTO) {
    const { data } = await client.patch<MappedGroupResponse>(
      `/groups/${groupId}`,
      body,
    );
    return data;
  }

  async delete(groupId: string) {
    const { data } = await client.delete<MappedGroupResponse>(
      `/groups/${groupId}`,
    );
    return data;
  }

  async getGroupStudents(groupId: string, order?: Order) {
    const params = order ? { order, sort: 'lastName' } : {};
    const { data } = await client.get<GroupStudentsResponse>(
      `/groups/${groupId}/students`,
      {
        params,
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
      },
    );

    return data;
  }

  async removeStudent(groupId: string, studentId: string): Promise<void> {
    await client.delete(`/groups/${groupId}/remove/${studentId}`);
  }

  async updateStudentRole(
    groupId: string,
    studentId: string,
    body: RoleDTO,
  ): Promise<void> {
    await client.patch(`/groups/${groupId}/switch/${studentId}`, body);
  }

  async updateCaptain(groupId: string, body: SwitchCaptainDTO) {
    const { data } = await client.post<OrdinaryStudentResponse>(
      `/groups/${groupId}/switchCaptain`,
      body,
    );
    return data;
  }

  async verifyStudent(groupId: string, userId: string, body: ApproveDTO) {
    const { data } = await client.patch<OrdinaryStudentResponse>(
      `/groups/${groupId}/verify/${userId}`,
      body,
    );
    return data;
  }

  async getDisciplines(groupId: string, params: QuerySemesterDTO) {
    const { data } = await client.get<ShortDisciplinesResponse>(
      `/groups/${groupId}/disciplines`,
      {
        params,
      },
    );

    return data;
  }

  async getDisciplineTeachers(groupId: string) {
    const { data } = await client.get<ExtendedDisciplineTeachersResponse>(
      `/groups/${groupId}/disciplineTeachers`,
    );

    return data;
  }

  async getGroupListUrl(groupId: string) {
    const { data } = await client.get<URLResponse>(`/groups/${groupId}/list`);

    return data;
  }

  async leaveGroup(groupId: string) {
    const { data } = await client.patch<OrdinaryStudentResponse>(
      `/groups/${groupId}/leave`,
      {},
    );
    return data;
  }

  async getSelectives(groupId: string) {
    const { data } = await client.get<SelectiveDisciplinesWithAmountResponse[]>(
      `/groups/${groupId}/selectiveDisciplines`,
    );
    return data;
  }
}

export default new GroupAPI();
