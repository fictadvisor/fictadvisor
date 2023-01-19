import { client, getAuthorizationHeader } from "../index";

import { GetTeachersBySubjectDTO } from "./dto/GetTeachersBySubjectDTO";
import { UpdateDisciplineBody } from "./dto/UpdateDisciplineBody";

export class SubjectsAPI {

    static async getTeachersBySubject(accessToken: string,
                                      disciplineId: string): Promise<GetTeachersBySubjectDTO> {
        return (await client.get(`disciplines/${disciplineId}/teachers`,
            getAuthorizationHeader(accessToken))).data;
    }

    static async updateDiscipline(accessToken: string,
                                  disciplineId: string,
                                  body: UpdateDisciplineBody) {
        await client.patch(`disciplines/${disciplineId}`,
            body,
            getAuthorizationHeader(accessToken));
    }
}
