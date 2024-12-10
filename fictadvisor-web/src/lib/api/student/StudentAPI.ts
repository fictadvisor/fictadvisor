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

class StudentAPI {
  async getAll(params: QueryAllStudentDTO): Promise<SimpleStudentsResponse> {
    const { data } = await client.get<SimpleStudentsResponse>(`/students`, {
      params,
    });
    return data;
  }

  async getStudent(studentId: string): Promise<SimpleStudentResponse> {
    const { data } = await client.get<SimpleStudentResponse>(
      `/students/${studentId}`,
    );
    return data;
  }

  async delete(studentId: string) {
    const { data } = await client.delete(`/students/${studentId}`);
    return data;
  }

  async create(body: CreateStudentWithRolesDTO) {
    const { data } = await client.post<FullStudentResponse>(`/students`, body);
    return data;
  }

  async editStudent(studentId: string, body: UpdateStudentWithRolesDTO) {
    const { data } = await client.patch<FullStudentResponse>(
      `/students/${studentId}`,
      body,
    );
    return data;
  }

  async editSelectives(studentId: string, body: UpdateStudentSelectivesDTO) {
    const { data } = await client.patch<FullStudentResponse>(
      `/students/${studentId}/selectiveDisciplines`,
      body,
    );
    return data;
  }

  async getSelectives(
    studentId: string,
  ): Promise<SelectiveDisciplinesResponse[]> {
    const { data } = await client.get<SelectiveDisciplinesResponse[]>(
      `/students/${studentId}/selectiveDisciplines`,
    );
    return data;
  }

  async getRemainingSelectives(
    studentId: string,
  ): Promise<RemainingSelectivesResponse[]> {
    const { data } = await client.get<RemainingSelectivesResponse[]>(
      `/students/${studentId}/remainingSelectives`,
    );
    return data;
  }
}

export default new StudentAPI();
