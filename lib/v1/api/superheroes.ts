import { AxiosInstance } from "axios";
import { PageQuery, SearchQuery, SortQuery } from "./core";

export type CreateSuperheroBody = {
  name: string;
  username: string;
  year: number;
  dorm: boolean;
};

export default (client: AxiosInstance) => {
  const getMe = async (token: string) => (await client.get(`/superheroes/me`, { headers: { Authorization: `Bearer ${token}` } })).data;
  const getAll = async (params: PageQuery & SearchQuery & SortQuery<'year' | 'dorm'>) => (await client.get(`/superheroes`, { params })).data;
  const createSuperhero = async (token: string, body: CreateSuperheroBody) => (await client.post(`/superheroes`, body, { headers: { Authorization: `Bearer ${token}` } })).data;

  return {
    getMe,
    createSuperhero,
    getAll,
  };
};