import { client, getAuthorizationHeader, QueryParams } from "../index";
import { GetSubjectDTO } from "./dto/GetSubjectDTO";
import { CreateSubjectBodyDTO } from "./dto/CreateSubjectBodyDTO";
import { GetListOfSubjectsDTO } from "./dto/GetListOfSubjectsDTO";

export class SubjectsAPI {
  static async get(subjectId: string): Promise<GetSubjectDTO> {
    return (await client.get(`/subjects/${subjectId}`)).data;
  }

  static async getAll(
    params: QueryParams<"rating" | "name" | "teacherCount">
  ): Promise<GetSubjectDTO[]> {
    return (await client.get("/subjects", { params })).data;
  }

  static async getListOfSubjects(accessToken: string): Promise<GetListOfSubjectsDTO[]> {
    return (await client.get(`/subjects`, getAuthorizationHeader(accessToken))).data;
  }

  static async deleteSubject(accessToken: string, subjectId: string) {
    return (await client.delete(`/subjects/${subjectId}`, getAuthorizationHeader(accessToken)));
  }

  static async create(accessToken: string, body: CreateSubjectBodyDTO) {
    return await client.post(
      `/subjects`,
      body,
      getAuthorizationHeader(accessToken)
    );
  }
}

