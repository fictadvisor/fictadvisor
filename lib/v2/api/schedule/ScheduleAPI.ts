import { GetSessionScheduleDTO } from "./dto/GetSessionScheduleDTO";
import { GetScheduleDTO } from "./dto/GetScheduleDTO";
import { GetDynamicLessonsDTO } from "./dto/GetDynamicLessonsDTO";

import { client, getAuthorizationHeader } from "../index";

export class ScheduleAPI {

    static async getSession(accessToken: string,
                            groupId: string): Promise<GetSessionScheduleDTO> {
        return (await client.get(`/group/${groupId}/session`,
            getAuthorizationHeader(accessToken))).data;
    }

    static async getSchedule(accessToken: string,
                             id: string,
                             fortnight?: string): Promise<GetScheduleDTO> {
        return (await client.get(`/groups/${id}/static/${fortnight}`,
            getAuthorizationHeader(accessToken))).data;
    }

    static async getDynamicLessons(accessToken: string,
                                   id: string,
                                   fortnight: string): Promise<GetDynamicLessonsDTO>{
        return (await client.get(`schedule/groups/${id}/temporary/?${fortnight}`,
            getAuthorizationHeader(accessToken))).data;
    }
}
