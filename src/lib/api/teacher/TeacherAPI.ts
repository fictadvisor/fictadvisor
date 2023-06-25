import { TeacherSearchFormFields } from '@/components/pages/search-pages/search-form/types';
import { GetTeacherCommentsDTO } from '@/lib/api/teacher/dto/GetTeacherCommentsDTO';
import { GetTeacherDisciplinesDTO } from '@/lib/api/teacher/dto/GetTeacherDisciplinesDTO';
import { GetTeacherSubjectDTO } from '@/lib/api/teacher/dto/GetTeacherSubjectDTO';
import { GetTeacherSubjectsDTO } from '@/lib/api/teacher/dto/GetTeacherSubjectsDTO';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { AddContactsBody } from './dto/AddContactsBody';
import { CreateTeacherBody } from './dto/CreateTeacherBody';
import { GetTeacherDTO } from './dto/GetTeacherDTO';
import { GetTeacherMarksDTO } from './dto/GetTeacherMarksDTO';
import { UpdateTeacherBody } from './dto/UpdateTeacherBody';
export class TeacherAPI {
  static async get(teacherId: string): Promise<GetTeacherDTO> {
    const { data } = await client.get(
      `/teachers/${teacherId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getAll(
    { search, order, sort, group }: TeacherSearchFormFields,
    pageSize: number,
  ): Promise<{ teachers: GetTeacherDTO[] }> {
    const url = `/teachers?${search ? `search=${search}` : ''}${
      order ? `&order=${order}` : ''
    }${sort ? `&sort=${sort}` : ''}${group ? `&group=${group}` : ''}${
      pageSize ? `&pageSize=${pageSize}` : ''
    }`;

    const { data } = await client.get(url, getAuthorizationHeader());
    return data;
  }

  static async getTeacherMarks(
    teacherId: string,
    subjectId?: string,
    semester?: number,
    year?: number,
  ): Promise<GetTeacherMarksDTO> {
    const { data } = await client.get(`/teachers/${teacherId}/marks`, {
      params: {
        semester,
        subjectId,
        year,
      },
    });
    return data;
  }

  static async getTeacherComments(
    teacherId: string,
    subjectId?: string,
    semester?: number,
    year?: number,
    sortBy?: string,
  ): Promise<GetTeacherCommentsDTO> {
    const { data } = await client.get(`/teachers/${teacherId}/comments`, {
      params: {
        semester,
        subjectId,
        year,
        sortBy,
      },
    });
    return data;
  }

  static async getTeacherDisciplines(
    teacherId: string,
    notAnswered?: boolean,
    userId?: string,
  ): Promise<GetTeacherDisciplinesDTO> {
    const { data } = await client.get(
      `/teachers/${teacherId}/disciplines?notAnswered=${notAnswered}&userId=${userId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async create(body: CreateTeacherBody) {
    const { data } = await client.post(
      '/teachers',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async addContacts(teacherId: string, body: AddContactsBody) {
    const { data } = await client.post(
      `/teachers/${teacherId}/contacts`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async update(teacherId: string, body: UpdateTeacherBody) {
    const { data } = await client.patch(
      `/teachers/${teacherId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async delete(teacherId: string) {
    const { data } = await client.delete(
      `/teachers/${teacherId}`,
      getAuthorizationHeader(),
    );
    return data;
  }
  static async getTeacherSubjects(
    teacherId: string,
  ): Promise<GetTeacherSubjectsDTO> {
    const { data } = await client.get(`/teachers/${teacherId}/subjects`);
    return data;
  }
  static async getTeacherSubject(
    teacherId: string,
    subjectId: string,
  ): Promise<GetTeacherSubjectDTO> {
    const { data } = await client.get(
      `/teachers/${teacherId}/subjects/${subjectId}`,
    );
    return data;
  }

  static async removeTeacher(teacherId: string): Promise<void> {
    await client.post(
      `/disciplineTeachers/${teacherId}/removeFromPoll`,
      {},
      getAuthorizationHeader(),
    );
  }
}
