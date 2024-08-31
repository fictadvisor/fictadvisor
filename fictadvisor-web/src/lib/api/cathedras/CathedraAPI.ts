import {
  CreateCathedraDTO,
  QueryAllCathedrasDTO,
  QueryAllTeacherDTO,
  UpdateCathedraDTO,
} from '@fictadvisor/utils/requests';
import {
  CathedraResponse,
  CathedrasDivisionsResponse,
  CathedraWithTeachersResponse,
  PaginatedCathedrasWithTeachersResponse,
  PaginatedTeachersResponse,
} from '@fictadvisor/utils/responses';

import { client } from '../instance';

class CathedraAPI {
  async getAll(params: QueryAllCathedrasDTO = {}) {
    const { data } = await client.get<PaginatedCathedrasWithTeachersResponse>(
      '/cathedras',
      {
        params,
      },
    );
    return data;
  }

  async getDepartmentById(cathedraId: string) {
    const data = client.get<CathedraWithTeachersResponse>(
      `/cathedras/${cathedraId}`,
    );
    return data;
  }

  async createDepartment(body: CreateCathedraDTO) {
    return await client.post<CathedraResponse>('/cathedras', body);
  }

  async editDepartment(cathedraId: string, body: UpdateCathedraDTO) {
    await client.patch<CathedraWithTeachersResponse>(
      `/cathedras/${cathedraId}`,
      body,
    );
  }

  async deleteDepartment(cathedraId: string) {
    await client.delete(`/cathedras/${cathedraId}`);
  }

  async getDepartmentTeachers(params: QueryAllTeacherDTO = {}) {
    const { data } = await client.get<PaginatedTeachersResponse>(`/teachers`, {
      params,
    });
    return data;
  }

  async getDivisions() {
    const { data } = await client.get<CathedrasDivisionsResponse>(
      '/cathedras/divisions',
    );
    return data;
  }
}

export default new CathedraAPI();
