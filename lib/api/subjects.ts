import { AxiosInstance } from "axios";
import { PageQuery, SearchQuery, SortQuery } from "./core";

const getAll = async (params: PageQuery & SearchQuery & SortQuery<'rating' | 'name' | 'teacherCount'>) => {
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

const get = async (link: string) => {
  return {
    id: link,
    link: link,
    name: "Системне програмування",
    //description: 'Дійсно, ніхто не відкидає, не зневажає, не уникає насолод тільки через те, що це насолоди, але лише через те, що тих, хто не вміє розумно вдаватися насолоді, осягають великі страждання. Так само як немає нікого, хто полюбивши, вважав за краще і зажадав би саме страждання тільки за те, що це страждання, а не тому, що інший раз виникають такі обставини, коли страждання і біль.',
    teacher_count: 5,
    rating: 4.3
  };
};

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
  return {
    get,
    getAll,
    getCourses,
  };
};