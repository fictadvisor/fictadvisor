import { GetAllDTO } from '@/lib/api/group/dto/GetAllDTO';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { GetDisciplineDTO } from './dto/GetDisciplineDTO';
import { GetTeachersDisciplineDTO } from './dto/GetTeachersDisciplineDTO';

export class GroupAPI {
  static async getDiscipline(groupId: string): Promise<GetDisciplineDTO> {
    const { data } = await client.get(
      `/groups/${groupId}/disciplines`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getDisciplineTeachers(
    groupId: string,
  ): Promise<GetTeachersDisciplineDTO> {
    const { data } = await client.get(
      `/groups/${groupId}/disciplineTeachers`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getAll(): Promise<GetAllDTO> {
    const { data } = await client.get('/groups');
    return data;
  }
}
