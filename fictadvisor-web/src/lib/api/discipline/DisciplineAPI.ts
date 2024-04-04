import { DisciplinesAdminSearchFormFields } from '@/components/pages/admin/admin-disciplines/search-disciplines/types';
import { AdminDiscipline } from '@/types/discipline';

import { client } from '../instance';
import { getAuthorizationHeader } from '../utils';

import AddDiscipline from './types/AddDiscipline';
import AddDisciplineTeacher from './types/AddDisciplineTeacher';
import GetAllDisciplines from './types/GetAllDisciplines';
import GetAllDisciplineTeachers from './types/GetAllDisciplineTeachers';
import UpdateDisciplineTeacher from './types/UpdateDisciplineTeacher';

class DisciplineAPI {
  async getPageDisciplines(
    params: Partial<DisciplinesAdminSearchFormFields> = {},
    pageSize?: number,
    page?: number,
  ) {
    const res = await client.get<GetAllDisciplines>('/disciplines', {
      params: {
        ...params,
        pageSize,
        page,
      },
    });
    return res.data;
  }

  async getAllDisciplines() {
    const res = await client.get<GetAllDisciplines>(
      '/disciplines',
      getAuthorizationHeader(),
    );
    return res.data;
  }

  async getDisciplinesById(disciplineId: string) {
    const { data } = await client.get<AdminDiscipline>(
      `/disciplines/${disciplineId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async addDiscipline(body: AddDiscipline) {
    return await client.post<AddDiscipline>(
      `/disciplines`,
      body,
      getAuthorizationHeader(),
    );
  }

  async deleteDiscipline(disciplineId: string) {
    return await client.delete(
      `/disciplines/${disciplineId}`,
      getAuthorizationHeader(),
    );
  }

  async getAllDisciplineTeachers(disciplineId: string) {
    const res = await client.get<GetAllDisciplineTeachers>(
      `/disciplines/${disciplineId}/teachers`,
      getAuthorizationHeader(),
    );
    return res.data;
  }

  async addDisciplineTeacher(body: AddDisciplineTeacher) {
    const res = await client.post<AddDisciplineTeacher>(
      `/disciplineTeachers`,
      body,
      getAuthorizationHeader(),
    );
    return res.data;
  }

  async updateDisciplineTeacher(
    disciplineTeacherId: string,
    body: UpdateDisciplineTeacher,
  ) {
    const res = await client.patch<UpdateDisciplineTeacher>(
      `/disciplineTeachers/${disciplineTeacherId}`,
      body,
    );
    return res.data;
  }

  async deleteDisciplineTeachers(disciplineTeacherId: string) {
    const res = await client.delete(
      `/disciplineTeachers/${disciplineTeacherId}`,
    );
    return res.data;
  }
}

export default new DisciplineAPI();
