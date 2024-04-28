import {
  CreateStudentWithRolesDTO,
  QueryAllStudentDTO,
  UpdateStudentSelectivesDTO,
  UpdateStudentWithRolesDTO,
} from '@fictadvisor/utils/requests';
import {
  FullStudentResponse,
  RemainingSelectivesResponse,
  SelectiveDisciplinesResponse,
  SimpleStudentResponse,
  SimpleStudentsResponse,
} from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

class StudentAPI {
  async getAll(params: QueryAllStudentDTO): Promise<SimpleStudentsResponse> {
    const { data } = await client.get<SimpleStudentsResponse>(`/students`, {
      params,
      ...getAuthorizationHeader(),
    });
    return data;
  }

  async getStudent(studentId: string): Promise<SimpleStudentResponse> {
    const { data } = await client.get<SimpleStudentResponse>(
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

  async create(body: CreateStudentWithRolesDTO) {
    const { data } = await client.post<FullStudentResponse>(
      `/students`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editStudent(studentId: string, body: UpdateStudentWithRolesDTO) {
    const { data } = await client.patch<FullStudentResponse>(
      `/students/${studentId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editSelectives(studentId: string, body: UpdateStudentSelectivesDTO) {
    const { data } = await client.patch<FullStudentResponse>(
      `/students/${studentId}/selectiveDisciplines`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getSelectives(
    studentId: string,
  ): Promise<SelectiveDisciplinesResponse[]> {
    const { data } = await client.get<SelectiveDisciplinesResponse[]>(
      `/students/${studentId}/selectiveDisciplines`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getRemainingSelectives(
    studentId: string,
  ): Promise<RemainingSelectivesResponse[]> {
    const { data } = await client.get<RemainingSelectivesResponse[]>(
      `/students/${studentId}/remainingSelectives`,
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new StudentAPI();
