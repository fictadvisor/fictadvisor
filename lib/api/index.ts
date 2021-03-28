import teachers from './teachers';
import studentResources from './studentResources';
import subjects from './subjects';

import axios from 'axios';

const client = axios.create({ baseURL: 'http://dev.fictadvisor.com:4545' });

const api = {
  teachers: teachers(client),
  studentResources: studentResources(client),
  subjects: subjects(client),
};

export default api;