import { AxiosInstance } from "axios";
import { PageQuery, SearchQuery, SortQuery } from "./core";

export type CreateReviewBody = {
  content: string;
  rating: number;
}

export default (client: AxiosInstance) => {
  const get = async (link: string) => (await client.get(`/courses/${link}`)).data;
  const getReviews = async (link: string, params: PageQuery & SearchQuery & SortQuery<'rating' | 'date'>) => (await client.get(`/courses/${link}/reviews`, { params })).data;
  const createReview = async (link: string, token: string, body) => (await client.post(`/courses/${link}/reviews`, body, { headers: { Authorization: `Bearer ${token}` } })).data;

  return {
    get,
    getReviews,
    createReview,
  };
};