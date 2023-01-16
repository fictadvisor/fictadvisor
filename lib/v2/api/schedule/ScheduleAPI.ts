import { GetScheduleDTO } from "./dto/GetScheduleDTO";
import { client, getAuthorizationHeader } from "../index";

export class ScheduleAPI {

    static async get(accessToken: string, groupId: string): Promise<GetScheduleDTO> {
        return (await client.get(`/group/${groupId}/session`,
            getAuthorizationHeader(accessToken))).data;
    }

}
