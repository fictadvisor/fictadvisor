import {
  CommentsQueryDTO,
  ComplaintDTO,
  CreateContactDTO,
  CreateTeacherDTO,
  DeleteCommentDTO,
  QueryAllCommentsDTO,
  QueryAllTeacherDTO,
  ResponseQueryDTO,
  UpdateCommentDTO,
  UpdateContactDTO,
  UpdateTeacherDTO,
} from '@fictadvisor/utils/requests';
import {
  CommentResponse,
  ContactResponse,
  DisciplineTeacherAndSubjectResponse,
  MarksResponse,
  PaginatedCommentsResponse,
  PaginatedQuestionCommentsResponse,
  PaginatedTeachersResponse,
  SubjectsResponse,
  TeacherWithContactsFullResponse,
  TeacherWithContactsResponse,
  TeacherWithRolesAndCathedrasResponse,
} from '@fictadvisor/utils/responses';

import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

class TeacherAPI {
  async get(teacherId: string): Promise<TeacherWithContactsResponse> {
    const { data } = await client.get<TeacherWithContactsResponse>(
      `/teachers/${teacherId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getAll(params: QueryAllTeacherDTO = {}) {
    const { data } = await client.get<PaginatedTeachersResponse>('/teachers', {
      params,
    });
    return data;
  }

  async getTeacherSubjects(teacherId: string) {
    const { data } = await client.get<SubjectsResponse>(
      `/teachers/${teacherId}/subjects`,
    );
    return data;
  }

  async getTeacherWithSubject(teacherId: string, subjectId: string) {
    const { data } = await client.get<TeacherWithContactsFullResponse>(
      `/teachers/${teacherId}/subjects/${subjectId}`,
    );
    return data;
  }

  async create(body: CreateTeacherDTO) {
    const { data } = await client.post<TeacherWithRolesAndCathedrasResponse>(
      `/teachers`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async delete(teacherId: string): Promise<void> {
    await client.delete(`/teachers/${teacherId}`, getAuthorizationHeader());
  }

  async editPersonalInfo(teacherId: string, body: UpdateTeacherDTO) {
    const { data } = await client.patch<TeacherWithRolesAndCathedrasResponse>(
      `/teachers/${teacherId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getTeacherMarks(teacherId: string, params: ResponseQueryDTO = {}) {
    const { data } = await client.get<MarksResponse>(
      `/teachers/${teacherId}/marks`,
      {
        params,
      },
    );
    return data;
  }

  async getTeacherComments(teacherId: string, params: CommentsQueryDTO = {}) {
    const { data } = await client.get<PaginatedQuestionCommentsResponse>(
      `/teachers/${teacherId}/comments`,
      {
        params,
      },
    );
    return data;
  }

  async getComments(params: QueryAllCommentsDTO) {
    const { data } = await client.get<PaginatedCommentsResponse>(
      '/disciplineTeachers/comments',
      {
        params,
        ...getAuthorizationHeader(),
      },
    );
    return data;
  }

  async deleteComment(disciplineTeacherId: string, body: DeleteCommentDTO) {
    const { data } = await client.delete<CommentResponse>(
      `/disciplineTeachers/${disciplineTeacherId}/comments`,
      { data: body, ...getAuthorizationHeader() },
    );
    return data;
  }

  async updateComment(disciplineTeacherId: string, body: UpdateCommentDTO) {
    const { data } = await client.patch<CommentResponse>(
      `/disciplineTeachers/${disciplineTeacherId}/comments`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async createTeacherContacts(teacherId: string, body: CreateContactDTO) {
    const { data } = await client.post<ContactResponse>(
      `/teachers/${teacherId}/contacts`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editTeacherContacts(
    teacherId: string,
    name: string,
    body: UpdateContactDTO,
  ) {
    const { data } = await client.patch<ContactResponse>(
      `/teachers/${teacherId}/contacts/${name}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editTeacherCathedra(teacherId: string, cathedraId: string) {
    const { data } = await client.patch<TeacherWithContactsFullResponse>(
      `/teachers/${teacherId}/cathedra/${cathedraId}`,
      {},
      getAuthorizationHeader(),
    );
    return data;
  }

  async deleteTeacherCathedra(teacherId: string, cathedraId: string) {
    const { data } = await client.delete<TeacherWithContactsFullResponse>(
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
    const { data } = await client.get<DisciplineTeacherAndSubjectResponse[]>(
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

  async postTeacherComplaint(teacherId: string, complaint: ComplaintDTO) {
    return await client.post(
      `/teachers/${teacherId}/sendComplaint`,
      complaint,
      getAuthorizationHeader(),
    );
  }
}

export default new TeacherAPI();
