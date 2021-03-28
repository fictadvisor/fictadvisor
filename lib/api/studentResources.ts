import { AxiosInstance } from "axios";
import { PageQuery, SearchQuery } from "./core";

export default (api: AxiosInstance) => {
  const getAll = async (params: PageQuery & SearchQuery) => (await api.get('/student-resources', { params })).data;

  return {
    getAll,
  };
};