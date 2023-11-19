import { CommentsAdminSearchFormFields } from '@/components/pages/admin/admin-comments/components/admin-comments-search/types/AdminCommentsSearch';
import { AdminSearchFormFields } from '@/components/pages/admin/admin-teachers/search-teacher-admin-page/types';
import { Complaint } from '@/components/pages/personal-teacher-page/personal-teacher-tabs/components/complaint-popup/types';
import { ChangeCommentBody } from '@/lib/api/teacher/types/ChangeCommentBody';
import { DeleteCommentBody } from '@/lib/api/teacher/types/DeleteCommentBody';
import { GetCommentsWithPaginationResponse } from '@/lib/api/teacher/types/GetCommentsWithPaginationResponse';
import { GetTeacherCommentsResponse } from '@/lib/api/teacher/types/GetTeacherCommentsResponse';
import { GetTeacherDisciplinesResponse } from '@/lib/api/teacher/types/GetTeacherDisciplinesResponse';
import { GetTeacherMarksResponse } from '@/lib/api/teacher/types/GetTeacherMarksResponse';
import { GetTeachersResponse } from '@/lib/api/teacher/types/GetTeachersResponse';
import { GetTeacherSubjectsResponse } from '@/lib/api/teacher/types/GetTeacherSubjectsResponse';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { Teacher, TeacherWithSubject } from '@/types/teacher';

import { client } from '../instance';

import { CreateContactsBody } from './types/CreateContactsBody';
import { CreateTeacherBody } from './types/CreateTeacherBody';
import { EditContactsBody } from './types/EditContactsBody';
import { EditPersonalInfoBody } from './types/EditPersonalInfoBody';

class TeacherAPI {
  async get(teacherId: string): Promise<Teacher> {
    const { data } = await client.get(
      `/teachers/${teacherId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getAdminAll(
    params: Partial<AdminSearchFormFields> = {},
    pageSize?: number,
    page?: number,
  ) {
    const { data } = await client.get<GetTeachersResponse>('/teachers', {
      params: {
        ...params,
        pageSize,
        page,
      },
    });
    return data;
  }

  async getTeacherSubjects(teacherId: string) {
    const { data } = await client.get<GetTeacherSubjectsResponse>(
      `/teachers/${teacherId}/subjects`,
    );
    return data;
  }

  async getTeacherSubject(teacherId: string, subjectId: string) {
    const { data } = await client.get<TeacherWithSubject>(
      `/teachers/${teacherId}/subjects/${subjectId}`,
    );
    return data;
  }

  async create(body: CreateTeacherBody) {
    const { data } = await client.post<Omit<Teacher, 'contacts'>>(
      `/teachers`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async delete(teacherId: string) {
    await client.delete(`/teachers/${teacherId}`, getAuthorizationHeader());
  }

  async editPersonalInfo(teacherId: string, body: EditPersonalInfoBody) {
    const { data } = await client.patch(
      `/teachers/${teacherId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getTeacherMarks(
    teacherId: string,
    subjectId?: string,
    semester?: number,
    year?: number,
  ) {
    const { data } = await client.get<GetTeacherMarksResponse>(
      `/teachers/${teacherId}/marks`,
      {
        params: {
          semester,
          subjectId,
          year,
        },
      },
    );
    return data;
  }

  async getTeacherComments(
    teacherId: string,
    subjectId?: string,
    semester?: number,
    year?: number,
    sortBy?: string,
  ) {
    const { data } = await client.get<GetTeacherCommentsResponse>(
      `/teachers/${teacherId}/comments`,
      {
        params: {
          semester,
          subjectId,
          year,
          sortBy,
        },
      },
    );
    return data;
  }

  async getComments(
    page: number,
    params: Partial<CommentsAdminSearchFormFields> = {},
    pageSize?: number,
  ) {
    const { data } = await client.get<GetCommentsWithPaginationResponse>(
      '/disciplineTeachers/comments',
      {
        params: {
          ...params,
          page,
          pageSize,
        },
        ...getAuthorizationHeader(),
      },
    );
    return data;
  }

  async deleteComment(body: DeleteCommentBody, disciplineTeacherId: string) {
    const { data } = await client.delete(
      `/disciplineTeachers/${disciplineTeacherId}/comments`,
      { data: body, ...getAuthorizationHeader() },
    );
    return data;
  }

  async updateComment(body: ChangeCommentBody, disciplineTeacherId: string) {
    const { data } = await client.patch(
      `/disciplineTeachers/${disciplineTeacherId}/comments`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async createTeacherContacts(teacherId: string, body: CreateContactsBody) {
    const { data } = await client.post(
      `/teachers/${teacherId}/contacts`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editTeacherContacts(
    teacherId: string,
    name: string,
    body: EditContactsBody,
  ) {
    const { data } = await client.patch(
      `/teachers/${teacherId}/contacts/${name}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editTeacherCathedra(teacherId: string, cathedraId: string) {
    const { data } = await client.patch(
      `/teachers/${teacherId}/cathedra/${cathedraId}`,
      null,
      getAuthorizationHeader(),
    );
    return data;
  }

  async deleteTeacherCathedra(teacherId: string, cathedraId: string) {
    const { data } = await client.delete(
      `/teachers/${teacherId}/cathedra/${cathedraId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getTeacherDisciplines(
    teacherId: string,
    notAnswered?: boolean,
    userId?: string,
  ) {
    const { data } = await client.get<GetTeacherDisciplinesResponse>(
      `/teachers/${teacherId}/disciplines`,
      {
        ...getAuthorizationHeader(),
        params: {
          notAnswered,
          userId,
        },
      },
    );
    return data;
  }

  async removeFromPoll(teacherId: string): Promise<void> {
    await client.post(
      `/disciplineTeachers/${teacherId}/removeFromPoll`,
      {},
      getAuthorizationHeader(),
    );
  }

  async postTeacherComplaint(teacherId: string, complaint: Complaint) {
    return await client.post<Complaint>(
      `/teachers/${teacherId}/sendComplaint`,
      complaint,
      getAuthorizationHeader(),
    );
  }
}

export default new TeacherAPI();
