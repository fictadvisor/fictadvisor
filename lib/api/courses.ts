import { AxiosInstance } from "axios";

export default (client: AxiosInstance) => {
  const get = async (link: string) => (await client.get(`/courses/${link}`)).data;

  return {
    get,
  };
};