import {
  CreateDisciplineDTO,
  CreateDisciplineTeacherDTO,
  QueryAllDisciplinesDTO,
  UpdateDisciplineTeacherDTO,
} from '@fictadvisor/utils/requests';
import {
  DisciplinesResponse,
  DisciplineTeacherCreateResponse,
  DisciplineTeachersResponse,
  ExtendedDisciplineTeachersResponse,
} from '@fictadvisor/utils/responses';

import { client } from '../instance';
import { getAuthorizationHeader } from '../utils';

class DisciplineAPI {
  async getPageDisciplines(params: QueryAllDisciplinesDTO = {}) {
    const { data } = await client.get<DisciplinesResponse>('/disciplines', {
      params,
    });
    return data;
  }

  async getDisciplinesById(disciplineId: string) {
    const { data } = await client.get<ExtendedDisciplineTeachersResponse>(
      `/disciplines/${disciplineId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async addDiscipline(body: CreateDisciplineDTO) {
    return await client.post<ExtendedDisciplineTeachersResponse>(
      `/disciplines`,
      body,
      getAuthorizationHeader(),
    );
  }

  async deleteDiscipline(disciplineId: string): Promise<void> {
    await client.delete(
      `/disciplines/${disciplineId}`,
      getAuthorizationHeader(),
    );
  }

  async getAllDisciplineTeachers(disciplineId: string) {
    const { data } = await client.get<DisciplineTeachersResponse>(
      `/disciplines/${disciplineId}/teachers`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async addDisciplineTeacher(body: CreateDisciplineTeacherDTO) {
    const { data } = await client.post<DisciplineTeacherCreateResponse>(
      `/disciplineTeachers`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async updateDisciplineTeacher(
    disciplineTeacherId: string,
    body: UpdateDisciplineTeacherDTO,
  ) {
    const { data } = await client.patch<DisciplineTeacherCreateResponse>(
      `/disciplineTeachers/${disciplineTeacherId}`,
      body,
    );
    return data;
  }

  async deleteDisciplineTeachers(disciplineTeacherId: string): Promise<void> {
    await client.delete(`/disciplineTeachers/${disciplineTeacherId}`);
  }
}

export default new DisciplineAPI();
