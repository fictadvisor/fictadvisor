import { SubjectSearchFormFields } from '@/components/pages/search-pages/search-form/types';
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
    disciplineId: string,
  ): Promise<GetTeachersBySubjectDTO> {
    const { data } = await client.get(
      `disciplines/${disciplineId}/teachers`,
      getAuthorizationHeader(),
    );
    return data;
  }

  // static async getListOfSubjects(): Promise<GetListOfSubjectsDTO[]> {
  //   const { data } = await client.get(`/subjects`, getAuthorizationHeader());
  //   return data;
  // }

  static async getAll(
    { search, order, sort, group }: SubjectSearchFormFields,
    pageSize: number,
  ): Promise<GetListOfSubjectsDTO> {
    const url = `/subjects?${search ? `search=${search}` : ''}${
      order ? `&order=${order}` : ''
    }${sort ? `&sort=${sort}` : ''}${group ? `&group=${group}` : ''}${
      pageSize ? `&pageSize=${pageSize}` : ''
    }`;

    console.log(url);

    const { data } = await client.get(url, getAuthorizationHeader());
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
    const { data } = await client.patch(
      `disciplines/${disciplineId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async createSubject(
    body: CreateSubjectBody,
  ): Promise<CreateSubjectDTO> {
    const { data } = await client.post('/subjects', body);
    return data;
  }

  static async updateSubject(subjectId: string, body: UpdateSubjectBody) {
    const { data } = await client.patch(`/subjects/${subjectId}`, body);
    return data;
  }
}
