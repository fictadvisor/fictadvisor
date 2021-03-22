import axios from 'axios';

const api = axios.create({
  baseURL: 'http://dev.fictadvisor.com:4545'
});

export default api;
