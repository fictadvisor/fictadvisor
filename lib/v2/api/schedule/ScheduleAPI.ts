import { client, getAuthorizationHeader, QueryParams } from "../index";
import { CreateLessonBodyDTO } from "./dto/CreateLessonBodyDTO";
import { GetLessonDTO } from "./dto/GetLessonDTO";
import { GetTeacherScheduleDTO } from "./dto/GetTeacherScheduleDTO";
import { UpdateStaticLesson } from "./dto/UpdateStaticLesson";
import { UpdateDynamicLesson } from "./dto/UpdateDynamicLesson";

export class ScheduleAPI {
    static async createLesson(accessToken: string, body: CreateLessonBodyDTO) {
        return (await client.post(
            `/schedule`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

    static async updateStaticLesson(accessToken: string, lessonId: string, body: UpdateStaticLesson) {
        return (await client.patch(
            `/schedule/lessons/static/${lessonId}`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

    static async updateDynamicLesson(accessToken: string, id: string, fortnight: string, body: UpdateDynamicLesson) {
        return (await client.patch(
            `/schedule/lessons/static/${id}/${fortnight}}`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

    static async getStaticLesson(accessToken: string, id: string, groupId: string): Promise<GetLessonDTO> {
        return (await client.get(`/schedule/group/${groupId}/lessons/static/${id}`
            , getAuthorizationHeader(accessToken))).data;
    };

    static async getTemporaryLesson(accessToken: string, id: string, groupId: string): Promise<GetLessonDTO> {
        return (await client.get(`/schedule/group/${groupId}/lessons/temprorary/${id}`
            , getAuthorizationHeader(accessToken))).data;
    };

    static async getTeacherSchedule(accessToken: string, teacherId: string, fortnight: string): Promise<GetTeacherScheduleDTO> {
        return (await client.get(`/schedule/teachers/${teacherId}/static/:?${fortnight}`
            , getAuthorizationHeader(accessToken))).data;
    }
}

