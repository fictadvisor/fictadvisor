import { AxiosInstance } from "axios";
import { PageQuery, SearchQuery, SortQuery } from "./core";

const getCourses = async (link: string, params: PageQuery & SearchQuery & SortQuery<'rating' | 'name'>) => {
  const items = [];

  for (let i = 0; i < params.page_size; i++) {
    const rating = Math.min(((((i + 7) * 11 * 7) % 50 + 1) / 10), 4.9);
    const reviewCount = ((i + 11) * 7) % 12;

    items.push({
      id: i.toString(),
      link: i.toString(),
      name: 'Системне програмування - ' + (i + 1),
      review_count: reviewCount,
      rating: rating,
      recommended: reviewCount > 0 && rating > 4,
    });
  }

  return {
    count: Number.MAX_SAFE_INTEGER,
    items,
  };
}

const getContacts = async (link: string) => {
  return {
    items: [
      { name: 'Телефон', value: '+380 50 507 29 43', type: 'other' },
      { name: 'Telegram', value: '@lisovychenko', type: 'other' },
      { name: 'Телефон', value: '+380 50 507 29 43', type: 'other' }
    ],
  };
};

const getReviews = async (link: string, params: PageQuery & SearchQuery & SortQuery<'rating' | 'date'>) => {
  const items = [];

  for (let i = 0; i < params.page_size; i++) {
    const rating = Math.min(((((i + 7) * 11 * 7) % 50 + 1) / 10), 4.9);

    items.push({
      id: i.toString(),
      content: '',
      course: {
        id: i.toString(),
        name: 'Системне програмування',
        link: i.toString(),
      },
      rating: rating,
      date: new Date().toString(),
    });
  }

  return {
    count: Number.MAX_SAFE_INTEGER,
    items,
  };
};

const getStats = async (link: string) => {
  return {
    items: [
      { name: 'Ввічливість', rating: 2.5 },
      { name: 'Пунктуальність', rating: 4 },
      { name: 'Об\'єктивність', rating: 5 },
      { name: 'Загалом', rating: 3.8 }
    ],
  };
};

export default (api: AxiosInstance) => {
  const get = async (link: string) => (await api.get(`/teachers/${link}`)).data;
  const getAll = async (params: PageQuery & SearchQuery & SortQuery<'rating' | 'lastName'>) => (await api.get('/teachers', { params })).data;
  const getCourses = async (link: string, params: PageQuery & SearchQuery & SortQuery<'rating' | 'name'>) => (await api.get(`/teachers/${link}/courses`, { params })).data;
  //const getReviews = async (link: string, params: PageQuery & SearchQuery & SortQuery<'rating' | 'name'>) => (await api.get(`/teachers/${link}/reviews`, { params })).data;
  const getContacts = async (link: string) => (await api.get(`/teachers/${link}/contacts`)).data;


  return {
    get,
    getAll,
    getCourses,
    getContacts,
    getReviews,
    getStats,
  };
};