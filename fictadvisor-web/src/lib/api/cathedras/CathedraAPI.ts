import { SearchFormFields } from '@/app/(search-pages)/search-form/types';
import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';
import { Cathedra } from '@/types/cathedra';

import {
  AllCathedrasResponse,
  CathedraTeachersResponse,
  DivisionsResponse,
} from './types/AllCathedrasResponse';

class CathedraAPI {
  async getAll(
    params: Partial<SearchFormFields> = {},
    pageSize?: number,
    page?: number,
  ) {
    const { data } = await client.get<AllCathedrasResponse>('/cathedras', {
      params: {
        ...params,
        pageSize,
        page,
      },
    });
    return data;
  }

  async getDepartmentById(cathedraId: string) {
    const data = client.get<Cathedra>(
      `/cathedras/${cathedraId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async createDepartment(
    name: string,
    abbreviation: string,
    division: string,
    teachers?: string[],
  ) {
    return await client.post<Cathedra>(
      '/cathedras',
      {
        name,
        abbreviation,
        division,
        teachers,
      },
      getAuthorizationHeader(),
    );
  }

  async editDepartment(
    cathedraId: string,
    name: string,
    abbreviation: string,
    division: string,
    deleteTeachers: string[],
    addTeachers: string[],
  ) {
    await client.patch<Cathedra>(
      `/cathedras/${cathedraId}`,
      {
        name,
        abbreviation,
        division,
        deleteTeachers,
        addTeachers,
      },
      getAuthorizationHeader(),
    );
  }

  async deleteDepartment(cathedraId: string) {
    await client.delete(`/cathedras/${cathedraId}`, getAuthorizationHeader());
  }

  async getDepartmentTeachers(
    cathedraId: string,
    notInDepartment: boolean,
    pageSize?: number,
    page?: number,
  ) {
    const { data } = await client.get<CathedraTeachersResponse>(`/teachers`, {
      params: {
        pageSize,
        page,
        notInDepartments: notInDepartment,
        cathedrasId: [cathedraId],
      },
    });
    return data;
  }

  async getDivisions() {
    const { data } = await client.get<DivisionsResponse>(
      '/cathedras/divisions',
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new CathedraAPI();
