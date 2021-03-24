import axios from 'axios';

const api = axios.create({ baseURL: 'http://dev.fictadvisor.com:4545' });

export interface PageQuery {
  page?: number;
  page_size?: number;
};

export interface SearchQuery {
  search?: string;
};

export interface SortQuery {
  sort?: string;
}

const fetchTeacher = async (link: string) => (await api.get(`/teachers/${link}`)).data;
const fetchTeachers = async (params: PageQuery & SearchQuery & SortQuery) => (await api.get('/teachers', { params })).data;

const fetchStudentResources = async (params: PageQuery & SearchQuery) => (await api.get('/student-resources', { params })).data;

export default {
  fetchTeacher,
  fetchTeachers,
  fetchStudentResources,
};

