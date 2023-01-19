import { client, getAuthorizationHeader } from "../index";

import { GetTeachersBySubjectDTO } from "./dto/GetTeachersBySubjectDTO";

export class SubjectsAPI {

    static async getTeachersBySubject(accessToken: string,
                                      disciplineId: string): Promise<GetTeachersBySubjectDTO> {
        return (await client.get(`disciplines/${disciplineId}/teachers`,
            getAuthorizationHeader(accessToken))).data;
    }
}
