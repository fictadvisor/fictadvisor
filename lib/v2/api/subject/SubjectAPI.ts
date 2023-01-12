import { client, getAuthorizationHeader, QueryParams } from "../index";
import { GetSubjectDTO } from "./dto/GetSubjectDTO";
import { CreateSubjectBodyDTO } from "./dto/CreateSubjectBodyDTO";

export class SubjectsAPI {
  static async get(subjectId: string): Promise<GetSubjectDTO> {
    return (await client.get(`/subjects/${subjectId}`)).data;
  }

  static async getAll(
    params: QueryParams<"rating" | "name" | "teacherCount">
  ): Promise<GetSubjectDTO[]> {
    return (await client.get("/subjects", { params })).data;
  }

  static async create(accessToken: string, body: CreateSubjectBodyDTO) {
    return await client.post(
      `/subjects`,
      body,
      getAuthorizationHeader(accessToken)
    );
  }
}
