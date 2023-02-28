import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { GetSelectiveStudentDTO } from './dto/GetSelectiveStudentDTO';

export class DisciplineAPI {
  static async get(disciplineId: string) {
    const { data } = await client.get(`/disciplines/${disciplineId}`);
    return data;
  }

  static async getSelectiveStudent(
    userId?: string,
  ): Promise<GetSelectiveStudentDTO> {
    const { data } = await client.get(
      `/disciplines/selective/${userId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async createSelectiveDiscipline(disciplineId: string) {
    const { data } = await client.post(
      `/disciplines/${disciplineId}/selective`,
      getAuthorizationHeader(),
    );
    return data;
  }
}
