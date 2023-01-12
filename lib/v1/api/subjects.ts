import { AxiosInstance } from "axios";
import { PageQuery, SearchQuery, SortQuery } from "./core";

export type CreateSubjectBody = {
  name: string;
  description?: string;
};

export default (client: AxiosInstance) => {
  const get = async (link: string) => (await client.get(`/subjects/${link}`)).data;
  const getAll = async (params: PageQuery & SearchQuery & SortQuery<'rating' | 'name' | 'teacherCount'>) => (await client.get('/subjects', { params })).data;
  const getCourses = async (link: string, params: PageQuery & SearchQuery & SortQuery<'rating' | 'name'>) => (await client.get(`/subjects/${link}/courses`, { params })).data;
  const create = async (accessToken: string, body: CreateSubjectBody) => (await client.post(`/subjects`, body, { headers: { Authorization: `Bearer ${accessToken}` } })).data;

  return {
    get,
    getAll,
    getCourses,
    create,
  };
};