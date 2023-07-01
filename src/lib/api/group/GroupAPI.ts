import { AddStudentsByMailBody } from '@/lib/api/group/types/AddStudentsByMailBody';
import { AddStudentsByMailResponse } from '@/lib/api/group/types/AddStudentsByMailResponse';
import { GetAllResponse } from '@/lib/api/group/types/GetAllResponse';
import { GetGroupStudentResponse } from '@/lib/api/group/types/GetGroupStudentsResponse';
import { GetPendingStudentsResponse } from '@/lib/api/group/types/GetPendingStudentsResponse';
import { UpdateStudentRoleBody } from '@/lib/api/group/types/UpdateStudentRoleBody';
import { VerifyStudentBody } from '@/lib/api/group/types/VerifyStudentBody';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { GroupStudent } from '@/types/student';

import { client } from '../instance';

class GroupAPI {
  async addStudentsByMail(groupId: string, body: AddStudentsByMailBody) {
    return await client.post<AddStudentsByMailResponse>(
      `/groups/${groupId}/addEmails`,
      body,
      getAuthorizationHeader(),
    );
  }

  async getAll() {
    const res = await client.get<GetAllResponse>('/groups');
    return res.data;
  }

  async getGroupStudents(groupId: string) {
    const res = await client.get<GetGroupStudentResponse>(
      `/groups/${groupId}/students`,
      getAuthorizationHeader(),
    );
    return res.data;
  }

  async getRequestStudents(groupId: string) {
    const res = await client.get<GetPendingStudentsResponse>(
      `/groups/${groupId}/unverifiedStudents`,
      getAuthorizationHeader(),
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
}

export default new GroupAPI();
