import axios from 'axios';

const api = axios.create({ baseURL: 'http://dev.fictadvisor.com:4545' });

export interface PageQuery {
  page?: number;
  page_size?: number;
};

export interface SearchQuery {
  search?: string;
};

export interface SortQuery {
  sort?: string;
}

const fetchTeacher = async (link: string) => (await api.get(`/teachers/${link}`)).data;
const fetchTeachers = async (params: PageQuery & SearchQuery & SortQuery) => (await api.get('/teachers', { params })).data;

const fetchStudentResources = async (params: PageQuery & SearchQuery) => (await api.get('/student-resources', { params })).data;

const fetchSubjects = async (params: PageQuery & SearchQuery & SortQuery) => {
  const items = [];

  for (let i = 0; i < params.page_size; i++) {
    items.push({
      id: i.toString(),
      link: i.toString(),
      name: `Системне програмування - ${i + 1}`,
      teacher_count: ((i + 11) * 7) % 12
    });
  }

  return {
    count: Number.MAX_SAFE_INTEGER,
    items,
  };
};

const fetchSubject = async (link: string) => {
  return {
    id: link,
    link: link,
    name: "Системне програмування",
    //description: 'Дійсно, ніхто не відкидає, не зневажає, не уникає насолод тільки через те, що це насолоди, але лише через те, що тих, хто не вміє розумно вдаватися насолоді, осягають великі страждання. Так само як немає нікого, хто полюбивши, вважав за краще і зажадав би саме страждання тільки за те, що це страждання, а не тому, що інший раз виникають такі обставини, коли страждання і біль.',
    teacher_count: 5,
    rating: 4.3
  };
};

const fetchCoursesBySubject = async (link: string, params: PageQuery & SearchQuery & SortQuery) => {
  const items = [];

  for (let i = 0; i < params.page_size; i++) {
    const rating = Math.min(((((i + 7) * 11 * 7) % 50 + 1) / 10), 4.9);
    const reviewCount = ((i + 11) * 7) % 12;

    items.push({
      id: i.toString(),
      link: i.toString(),
      teacher: {
        id: i.toString(),
        first_name: 'Олег',
        last_name: 'Лісовиченко',
        middle_name: 'Іванович',
        link: 'lisovichenko-oleg-ivanovich'
      },
      review_count: reviewCount,
      rating: rating,
      recommended: reviewCount > 0 && rating > 4,
    });
  }

  return {
    count: Number.MAX_SAFE_INTEGER,
    items,
  };
};

export default {
  fetchTeacher,
  fetchTeachers,
  fetchStudentResources,
  fetchSubject,
  fetchSubjects,
  fetchCoursesBySubject,
};

