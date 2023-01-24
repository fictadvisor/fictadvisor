import { AxiosInstance } from "axios";
import { PageQuery, SearchQuery, SortQuery } from "./core";

export type CreateReviewBody = {
  content: string;
  rating: number;
};

export type CreateCourseBody = {
  teacher_id: string;
  subject_id: string;
};

export default (client: AxiosInstance) => {
  const get = async (link: string) => (await client.get(`/courses/${link}`)).data;
  const getReviews = async (link: string, params: PageQuery & SearchQuery & SortQuery<'rating' | 'date'>) => (await client.get(`/courses/${link}/reviews`, { params })).data;
  const createReview = async (link: string, token: string, body: CreateReviewBody) => (await client.post(`/courses/${link}/reviews`, body, { headers: { Authorization: `Bearer ${token}` } })).data;
  const create = async (token: string, body: CreateCourseBody) => (await client.post(`/courses`, body, { headers: { Authorization: `Bearer ${token}` } })).data;

  return {
    get,
    getReviews,
    createReview,
    create,
  };
};