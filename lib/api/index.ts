import axios from 'axios';

import teachers from './teachers';
import studentResources from './studentResources';
import subjects from './subjects';
import courses from './courses';
import oauth from './oauth';
import search from './search';

const baseURL = process.browser ? process.env.NEXT_PUBLIC_API_BASE_URL : process.env.API_BASE_URL;
const client = axios.create({ baseURL });

const api = {
  teachers: teachers(client),
  studentResources: studentResources(client),
  subjects: subjects(client),
  oauth: oauth(client),
  courses: courses(client),
  search: search(client),
};

export default api;