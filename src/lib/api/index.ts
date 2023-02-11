import axios from 'axios';

const baseURL = process.browser
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : process.env.API_BASE_URL;
export const client = axios.create({ baseURL });

export interface PageQuery {
  page?: number;
  page_size?: number;
}

export interface SearchQuery {
  search?: string;
  all?: boolean;
}

export interface SortQuery<T = string> {
  sort?: T;
}

export interface QueryParams<T = string>
  extends PageQuery,
    SearchQuery,
    SortQuery<T> {}

export const getAuthorizationHeader = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};
