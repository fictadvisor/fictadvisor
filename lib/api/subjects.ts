import { AxiosInstance } from "axios";
import { PageQuery, SearchQuery, SortQuery } from "./core";

const getCourses = async (link: string, params: PageQuery & SearchQuery & SortQuery<'rating' | 'lastName'>) => {
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

export default (client: AxiosInstance) => {
  const get = async (link: string) => (await client.get(`/subjects/${link}`)).data;

  const getAll = async (params: PageQuery & SearchQuery & SortQuery<'rating' | 'name' | 'teacherCount'>) => (await client.get('/subjects', { params })).data;

  return {
    get,
    getAll,
    getCourses,
  };
};