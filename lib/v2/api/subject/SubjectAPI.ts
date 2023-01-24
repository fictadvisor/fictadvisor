import { client, getAuthorizationHeader } from "../index";
import { GetListOfSubjectsDTO } from "./dto/GetListOfSubjectsDTO";
import { GetTeachersBySubjectDTO } from "./dto/GetTeachersBySubjectDTO";
import { UpdateDisciplineBody } from "./dto/UpdateDisciplineBody";

export class SubjectsAPI {

    static async getTeachersBySubject(accessToken: string,
                                      disciplineId: string): Promise<GetTeachersBySubjectDTO> {
        return (await client.get(`disciplines/${disciplineId}/teachers`,
            getAuthorizationHeader(accessToken))).data;
    }

  static async getListOfSubjects(accessToken: string): Promise<GetListOfSubjectsDTO[]> {
    return (await client.get(`/subjects`, getAuthorizationHeader(accessToken))).data;
  }

  static async deleteSubject(accessToken: string, subjectId: string) {
    return (await client.delete(`/subjects/${subjectId}`, getAuthorizationHeader(accessToken)));
  }


  static async updateDiscipline(accessToken: string,
                                  disciplineId: string,
                                  body: UpdateDisciplineBody) {
        await client.patch(`disciplines/${disciplineId}`,
            body,
            getAuthorizationHeader(accessToken));
    }
}

