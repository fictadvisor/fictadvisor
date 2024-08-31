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
    );
    return data;
  }

  async addDiscipline(body: CreateDisciplineDTO) {
    return await client.post<ExtendedDisciplineTeachersResponse>(
      `/disciplines`,
      body,
    );
  }

  async deleteDiscipline(disciplineId: string): Promise<void> {
    await client.delete(`/disciplines/${disciplineId}`);
  }

  async getAllDisciplineTeachers(disciplineId: string) {
    const { data } = await client.get<DisciplineTeachersResponse>(
      `/disciplines/${disciplineId}/teachers`,
    );
    return data;
  }

  async addDisciplineTeacher(body: CreateDisciplineTeacherDTO) {
    const { data } = await client.post<DisciplineTeacherCreateResponse>(
      `/disciplineTeachers`,
      body,
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
