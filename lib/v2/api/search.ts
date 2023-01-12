import { AxiosInstance } from "axios";
import { SearchQuery } from "./index";

export default (client: AxiosInstance) => {
  const getAll = async (params: SearchQuery) =>
    (await client.get(`/search`, { params })).data;
  return {
    getAll,
  };
};
