import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { CreateSubjectBody } from './dto/CreateSubjectBody';
import { CreateSubjectDTO } from './dto/CreateSubjectDTO';
import { GetListOfSubjectsDTO } from './dto/GetListOfSubjectsDTO';
import { GetTeachersBySubjectDTO } from './dto/GetTeachersBySubjectDTO';
import { UpdateDisciplineBody } from './dto/UpdateDisciplineBody';
import { UpdateSubjectBody } from './dto/UpdateSubjectBody';

export class SubjectsAPI {
  static async getTeachersBySubject(
    accessToken: string,
    disciplineId: string,
  ): Promise<GetTeachersBySubjectDTO> {
    return (
      await client.get(
        `disciplines/${disciplineId}/teachers`,
        getAuthorizationHeader(accessToken),
      )
    ).data;
  }

  static async getListOfSubjects(): Promise<GetListOfSubjectsDTO[]> {
    const { data } = await client.get(`/subjects`, getAuthorizationHeader());
    return data;
  }

  static async deleteSubject(subjectId: string) {
    const { data } = await client.delete(
      `/subjects/${subjectId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async updateDiscipline(
    disciplineId: string,
    body: UpdateDisciplineBody,
  ) {
    await client.patch(
      `disciplines/${disciplineId}`,
      body,
      getAuthorizationHeader(),
    );
  }

  static async createSubject(
    body: CreateSubjectBody,
  ): Promise<CreateSubjectDTO> {
    const { data } = await client.post('/v2/subjects', body);
    return data;
  }

  static async updateSubject(subjectId: string, body: UpdateSubjectBody) {
    const { data } = await client.patch(`/v2/subjects/${subjectId}`, body);
    return data;
  }
}
