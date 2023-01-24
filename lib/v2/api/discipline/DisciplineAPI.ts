import {
  getAuthorizationHeader,
  PageQuery,
  SearchQuery,
  SortQuery,
} from "../index";
import { client, QueryParams } from "../index";
import { CreateCourseBody } from "../../../v1/api/courses";
import {GetSelectiveStudentDTO} from "./dto/GetSelectiveStudentDTO";

export class DisciplineAPI {
  static async getDisciplines(
    subjectId: string,
    params: QueryParams<"rating" | "name">
  ) {
    return (await client.get("/subjects/${link}/courses", { params })).data;
  }

  static async get(disciplineId: string) {
    return (await client.get(`/disciplines/${disciplineId}`)).data;
  }

  static async create(accessToken: string, body: CreateCourseBody) {
    return await client.post(
      `/courses`,
      body,
      getAuthorizationHeader(accessToken)
    );
  }

  static async getSelectiveStudent(accessToken: string, userId?: string): Promise<GetSelectiveStudentDTO> {
    return (await (client.get(
      `/disciplines/selective/${userId}`,
      getAuthorizationHeader(accessToken)
    )));
  }

  static async createSelectiveDiscipline(accessToken: string, disciplineId: string) {
    return (await (client.post(
      `/disciplines/${disciplineId}/selective`,
      getAuthorizationHeader(accessToken)
    )));
  }
}
