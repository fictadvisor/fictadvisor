import { client, getAuthorizationHeader, QueryParams } from "../index";
import { GetSubjectDTO } from "./dto/GetSubjectDTO";

export type CreateSubjectBody = {
  name: string;
  description?: string;
};

export class SubjectsAPI {
  static async get(subjectId: string): Promise<GetSubjectDTO> {
    return (await client.get(`/subjects/${subjectId}`)).data;
  }

  static async getAll(
    params: QueryParams<"rating" | "name" | "teacherCount">
  ): Promise<GetSubjectDTO[]> {
    return (await client.get("/subjects", { params })).data;
  }

  static async create(accessToken: string, body: CreateSubjectBody) {
    return await client.post(
      `/subjects`,
      body,
      getAuthorizationHeader(accessToken)
    );
  }
}
