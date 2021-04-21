import axios from 'axios';

import teachers from './teachers';
import studentResources from './studentResources';
import subjects from './subjects';
import courses from './courses';
import oauth from './oauth';
import search from './search';


const client = axios.create({ baseURL: 'http://dev.fictadvisor.com:4545' });

const api = {
  teachers: teachers(client),
  studentResources: studentResources(client),
  subjects: subjects(client),
  oauth: oauth(client),
  courses: courses(client),
  search: search(client),
};

export default api;