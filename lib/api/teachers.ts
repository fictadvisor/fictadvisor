import { AxiosInstance } from "axios";
import { PageQuery, SearchQuery, SortQuery } from "./core";

export type CreateTeacherBody = {
  first_name: string;
  last_name: string;
  middle_name?: string;
};

export default (api: AxiosInstance) => {
  const get = async (link: string) => (await api.get(`/teachers/${link}`)).data;
  const getAll = async (params: PageQuery & SearchQuery & SortQuery<'rating' | 'lastName'>) => (await api.get('/teachers', { params })).data;
  const getCourses = async (link: string, params: PageQuery & SearchQuery & SortQuery<'rating' | 'name'>) => (await api.get(`/teachers/${link}/courses`, { params })).data;
  const getReviews = async (link: string, params: PageQuery & SearchQuery & SortQuery<'rating' | 'date'>) => (await api.get(`/teachers/${link}/reviews`, { params })).data;
  const getContacts = async (link: string) => (await api.get(`/teachers/${link}/contacts`)).data;
  const getStats = async (link: string) => (await api.get(`/teachers/${link}/stats`)).data;
  const create = async (accessToken: string, body: CreateTeacherBody) => (await api.post(`/teachers`, body, { headers: { Authorization: `Bearer ${accessToken}` } })).data;

  return {
    get,
    getAll,
    getCourses,
    getContacts,
    getReviews,
    getStats,
    create,
  };
};