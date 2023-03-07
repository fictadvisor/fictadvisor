import { TeacherSearchFormFields } from '@/components/pages/search-pages/search-form/types';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { AddContactsBody } from './dto/AddContactsBody';
import { CreateTeacherBody } from './dto/CreateTeacherBody';
import { GetTeacherDTO } from './dto/GetTeacherDTO';
import { GetTeacherStatsDTO } from './dto/GetTeacherStatsDTO';
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

  static async getTeacherStats(
    teacherId: string,
    semester: number | string,
    subject: string,
    year: number,
  ): Promise<GetTeacherStatsDTO> {
    const { data } = await client.get(`/teachers/${teacherId}/stats?
        semester=${semester}
        &subject=${subject}
        &year=${year}`);
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
}
