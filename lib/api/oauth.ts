import { AxiosInstance } from "axios";

export default (api: AxiosInstance) => {
  const getMe = async (accessToken: string) => (await api.get('/oauth', { headers: { Authorization: `Bearer ${accessToken}` } })).data;
  const refresh = async (refreshToken: string) => (await api.post('/oauth/refresh', { refresh_token: refreshToken })).data;

  return {
    getMe,
    refresh,
  };
};
