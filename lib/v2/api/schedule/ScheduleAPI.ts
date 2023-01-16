import { GetSessionScheduleDTO } from "./dto/GetSessionScheduleDTO";
import { client, getAuthorizationHeader } from "../index";

export class ScheduleAPI {

    static async getSession(accessToken: string, groupId: string): Promise<GetSessionScheduleDTO> {
        return (await client.get(`/group/${groupId}/session`,
            getAuthorizationHeader(accessToken))).data;
    }

}
