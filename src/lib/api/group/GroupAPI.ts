import { GetAllDTO } from '@/lib/api/group/dto/GetAllDTO';
import { GetGroupStudentsDTO } from '@/lib/api/group/dto/GetGroupStudentsDTO';
import { GetRequestDTO } from '@/lib/api/group/dto/GetRequestDTO';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { GetDisciplineDTO } from './dto/GetDisciplineDTO';
import { GetTeachersDisciplineDTO } from './dto/GetTeachersDisciplineDTO';

export class GroupAPI {
  static async getDiscipline(groupId: string): Promise<GetDisciplineDTO> {
    return await client.get(
      `/groups/${groupId}/disciplines`,
      getAuthorizationHeader(),
    );
  }

  static async getDisciplineTeachers(
    groupId: string,
  ): Promise<GetTeachersDisciplineDTO> {
    return await client.get(
      `/groups/${groupId}/disciplineTeachers`,
      getAuthorizationHeader(),
    );
  }

  static async getAll(): Promise<GetAllDTO> {
    const res = await client.get('/groups');
    return res.data;
  }

  static async getGroupStudents(groupId: string): Promise<GetGroupStudentsDTO> {
    const res = await client.get(
      `/groups/${groupId}/students`,
      getAuthorizationHeader(),
    );
    return res.data;
  }

  static async getRequestStudents(groupId: string): Promise<GetRequestDTO> {
    const res = await client.get(
      `/groups/${groupId}/unverifiedStudents`,
      getAuthorizationHeader(),
    );
    return res.data;
  }
}
