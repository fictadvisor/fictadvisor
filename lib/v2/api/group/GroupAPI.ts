import {client, getAuthorizationHeader} from "../index";
import {GetDisciplineDTO} from "./dto/GetDisciplineDTO";
import {GetTeachersDisciplineDTO} from "./dto/GetTeachersDisciplineDTO";

export class GroupAPI {
  static async getDiscipline(accessToken: string, groupId: string): Promise<GetDisciplineDTO> {
    return (await (client.get(`/groups/${groupId}/disciplines`,
        getAuthorizationHeader(accessToken))));
  }

  static async getDisciplineTeachers(accessToken: string, groupId: string): Promise<GetTeachersDisciplineDTO> {
    return (await (client.get(`/groups/${groupId}/disciplineTeachers`,
        getAuthorizationHeader(accessToken))));
  }
}
