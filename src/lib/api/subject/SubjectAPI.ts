import { client, getAuthorizationHeader } from '../index';

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

  static async getListOfSubjects(
    accessToken: string,
  ): Promise<GetListOfSubjectsDTO[]> {
    return (await client.get(`/subjects`, getAuthorizationHeader(accessToken)))
      .data;
  }

  static async deleteSubject(accessToken: string, subjectId: string) {
    return await client.delete(
      `/subjects/${subjectId}`,
      getAuthorizationHeader(accessToken),
    );
  }

  static async updateDiscipline(
    accessToken: string,
    disciplineId: string,
    body: UpdateDisciplineBody,
  ) {
    await client.patch(
      `disciplines/${disciplineId}`,
      body,
      getAuthorizationHeader(accessToken),
    );
  }

  static async createSubject(
    accessToken: string,
    body: CreateSubjectBody,
  ): Promise<CreateSubjectDTO> {
    return (await client.post('/v2/subjects', body)).data;
  }

  static async updateSubject(
    accessToken: string,
    subjectId: string,
    body: UpdateSubjectBody,
  ) {
    return (await client.patch(`/v2/subjects/${subjectId}`, body)).data;
  }
}
