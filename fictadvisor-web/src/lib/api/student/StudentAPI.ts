import { StudentEdit } from '@/components/pages/admin/admin-student/common/types/StudentEdit';
import { StudentSearchFormFields } from '@/components/pages/admin/admin-student/common/types/StudentSearch';
import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { GroupStudent } from '@/types/student';

import { CreateStudentBody } from './types/CreateStudentBody';
import { CreateStudentResponse } from './types/CreateStudentResponse';
import { EditSelectiveBody } from './types/EditSelectiveBody';
import { GetAllResponse } from './types/GetAllResponse';
import { GetRemainingSelectivesResponse } from './types/GetRemainingSelectivesResponse';
import { GetSelectivesResponse } from './types/GetSelectivesResponse';

class StudentAPI {
  async getAll(
    page: number,
    params: Partial<StudentSearchFormFields> = {},
    pageSize?: number,
  ): Promise<GetAllResponse> {
    const { data } = await client.get(`/students`, {
      params: {
        ...params,
        page,
        pageSize,
      },
      ...getAuthorizationHeader(),
    });
    return data;
  }

  async getStudent(studentId: string): Promise<GroupStudent> {
    const { data } = await client.get(
      `/students/${studentId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async delete(studentId: string) {
    const { data } = await client.delete(
      `/students/${studentId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async create(body: CreateStudentBody) {
    const { data } = await client.post<CreateStudentResponse>(
      `/students`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editStudent(studentId: string, body: StudentEdit) {
    const { data } = await client.patch(
      `/students/${studentId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editSelective(studentId: string, body: EditSelectiveBody) {
    const { data } = await client.patch(
      `/students/${studentId}/selective`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async addSelective(studentId: string, body: EditSelectiveBody) {
    const { data } = await client.patch(
      `/students/${studentId}/selective`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getSelective(studentId: string): Promise<GetSelectivesResponse[]> {
    const { data } = await client.get(
      `/students/${studentId}/selective`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getRemainingSelective(
    studentId: string,
  ): Promise<GetRemainingSelectivesResponse[]> {
    const { data } = await client.get(
      `/students/${studentId}/remainingSelective`,
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new StudentAPI();
