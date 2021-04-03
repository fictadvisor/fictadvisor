import teachers from './teachers';
import studentResources from './studentResources';
import subjects from './subjects';

import axios from 'axios';
import oauth from './oauth';

const client = axios.create({ baseURL: 'http://dev.fictadvisor.com:4545' });

const api = {
  teachers: teachers(client),
  studentResources: studentResources(client),
  subjects: subjects(client),
  oauth: oauth(client),
};

export default api;