import {
  GroupCreateBody,
  GroupEditBody,
  GroupsSearchFormFields,
} from '@/components/pages/admin/admin-groups/common/types';
import { AddStudentsByMailBody } from '@/lib/api/group/types/AddStudentsByMailBody';
import { AddStudentsByMailResponse } from '@/lib/api/group/types/AddStudentsByMailResponse';
import { ExportGroupStudents } from '@/lib/api/group/types/ExportGroupStudents';
import { GetGroupDisciplines } from '@/lib/api/group/types/GetGroupDisciplines';
import { GetGroupStudentResponse } from '@/lib/api/group/types/GetGroupStudentsResponse';
import { GetDisciplinesWithTeachers } from '@/lib/api/group/types/GetGroupTeachers';
import { GetPendingStudentsResponse } from '@/lib/api/group/types/GetPendingStudentsResponse';
import { UpdateCaptainBody } from '@/lib/api/group/types/UpdateCaptainBody';
import { UpdateStudentRoleBody } from '@/lib/api/group/types/UpdateStudentRoleBody';
import { VerifyStudentBody } from '@/lib/api/group/types/VerifyStudentBody';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { Group } from '@/types/group';
import { GroupStudent } from '@/types/student';
import { User } from '@/types/user';

import { Order } from '../../services/group/types/OrderEnum';
import { client } from '../instance';

import { GetAllGroupsResponse } from './types/GetAllGroupsResponse';
import { GetSelectiveResponse } from './types/GetSelectiveResponse';

class GroupAPI {
  async addStudentsByMail(groupId: string, body: AddStudentsByMailBody) {
    return await client.post<AddStudentsByMailResponse>(
      `/groups/${groupId}/addEmails`,
      body,
      getAuthorizationHeader(),
    );
  }

  async get(groupId: string): Promise<Group> {
    const { data } = await client.get<Group>(
      `/groups/${groupId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getAll(
    page?: number,
    params?: Partial<GroupsSearchFormFields>,
    pageSize?: number,
  ): Promise<GetAllGroupsResponse> {
    const { data } = await client.get<GetAllGroupsResponse>(`/groups`, {
      params: {
        ...params,
        page,
        pageSize,
      },
      ...getAuthorizationHeader(),
    });
    return data;
  }

  async create(body: GroupCreateBody): Promise<Group> {
    const { data } = await client.post<Group>(
      `/groups`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editGroup(
    body: Partial<GroupEditBody>,
    groupId: string,
  ): Promise<Group> {
    const { data } = await client.patch<Group>(
      `/groups/${groupId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async delete(groupId: string): Promise<Group> {
    const { data } = await client.delete<Group>(
      `/groups/${groupId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getGroupStudents(
    groupId: string,
    order?: Order,
    sort?: 'lastName' | 'firstName' | 'middleName',
  ) {
    const res = await client.get<GetGroupStudentResponse>(
      `/groups/${groupId}/students`,
      {
        params: {
          order,
          sort,
        },
        ...getAuthorizationHeader(),
      },
    );
    return res.data;
  }

  async getRequestStudents(groupId: string, order?: Order) {
    const params = order ? { order, sort: 'lastName' } : {};
    const res = await client.get<GetPendingStudentsResponse>(
      `/groups/${groupId}/unverifiedStudents`,
      {
        params,
        ...getAuthorizationHeader(),
      },
    );

    return res.data;
  }

  async removeStudent(groupId: string, studentId: string) {
    await client.delete(
      `/groups/${groupId}/remove/${studentId}`,
      getAuthorizationHeader(),
    );
  }

  async updateStudentRole(
    groupId: string,
    studentId: string,
    body: UpdateStudentRoleBody,
  ) {
    await client.patch(
      `/groups/${groupId}/switch/${studentId}`,
      body,
      getAuthorizationHeader(),
    );
  }

  async updateCaptain(groupId: string, body: UpdateCaptainBody) {
    await client.post(
      `/groups/${groupId}/switchCaptain`,
      body,
      getAuthorizationHeader(),
    );
  }

  async verifyStudent(
    groupId: string,
    userId: string,
    body: VerifyStudentBody,
  ) {
    const { data } = await client.patch<GroupStudent>(
      `/groups/${groupId}/verify/${userId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getDisciplines(groupId: string, semester?: string, year?: string) {
    const { data } = await client.get<GetGroupDisciplines>(
      `/groups/${groupId}/disciplines`,
      {
        params: { year, semester },
        ...getAuthorizationHeader(),
      },
    );

    return data;
  }

  async getDisciplineTeachers(groupId: string) {
    const { data } = await client.get<GetDisciplinesWithTeachers>(
      `/groups/${groupId}/disciplineTeachers`,
      getAuthorizationHeader(),
    );

    return data;
  }

  async getGroupList(groupId: string) {
    const { data } = await client.get<GetGroupStudentResponse>(
      `/groups/${groupId}/list`,
      getAuthorizationHeader(),
    );

    return data;
  }

  async getGroupListUrl(groupId: string) {
    const { data } = await client.get<ExportGroupStudents>(
      `/groups/${groupId}/list`,
      getAuthorizationHeader(),
    );

    return data;
  }

  async leaveGroup(groupId: string) {
    const { data } = await client.patch<User>(
      `/groups/${groupId}/leave`,
      {},
      getAuthorizationHeader(),
    );
    return data;
  }

  async getSelectives(groupId: string) {
    const { data } = await client.get<GetSelectiveResponse[]>(
      `/groups/${groupId}/selective`,
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new GroupAPI();
