import { AxiosInstance } from "axios";
import { SearchQuery } from "./core";

export default (client: AxiosInstance) => {
  const getAll = async (params: SearchQuery) => (await client.get(`/search`, { params })).data;
  return {
    getAll,
  };
};