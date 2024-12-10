import {
  CreateSubjectDTO,
  QueryAllSubjectDTO,
  UpdateSubjectDTO,
} from '@fictadvisor/utils/requests';
import {
  PaginatedSubjectsResponse,
  SubjectResponse,
  SubjectWithTeachersResponse,
} from '@fictadvisor/utils/responses';

import { client } from '../instance';

class SubjectsAPI {
  async getTeachersBySubject(disciplineId: string) {
    const { data } = await client.get<SubjectWithTeachersResponse>(
      `subjects/${disciplineId}/teachers`,
    );
    return data;
  }
  async getSubject(subjectId: string) {
    const { data } = await client.get<SubjectResponse>(`subjects/${subjectId}`);
    return data;
  }

  async createSubject(name: string) {
    const body: CreateSubjectDTO = {
      name,
    };
    const { data } = await client.post<SubjectResponse>(`/subjects`, body);
    return data;
  }

  async editSubject(id: string, name: string) {
    const body: UpdateSubjectDTO = {
      name,
    };
    const { data } = await client.patch<SubjectResponse>(
      `/subjects/${id}`,
      body,
    );
    return data;
  }

  async getAll(params: QueryAllSubjectDTO = {}) {
    const { data } = await client.get<PaginatedSubjectsResponse>('/subjects', {
      params,
    });
    return data;
  }

  async delete(subjectId: string): Promise<void> {
    await client.delete(`/subjects/${subjectId}`);
  }
}

export default new SubjectsAPI();
