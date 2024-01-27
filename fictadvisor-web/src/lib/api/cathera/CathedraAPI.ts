import { SearchFormFields } from '@/components/pages/search-pages/search-form/types';
import {
  AllCathedrasResponse,
  Cathedra,
  CathedraTeachersResponse,
  DivisionsResponse,
} from '@/lib/api/cathera/types/GetAllResponse';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

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

  async createDepartment(
    name: string,
    abbreviation: string,
    division: string,
    teachers?: string[],
  ) {
    return await client.post<Cathedra>(
      '/cathedras',
      {
        name: name,
        abbreviation: abbreviation,
        division: division,
        teachers: teachers,
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
        name: name,
        abbreviation: abbreviation,
        division: division,
        deleteTeachers: deleteTeachers,
        addTeachers: addTeachers,
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
