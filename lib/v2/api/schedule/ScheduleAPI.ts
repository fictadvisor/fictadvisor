import { client, getAuthorizationHeader } from "../index";
import { GetSessionScheduleDTO } from "./dto/GetSessionScheduleDTO";
import { GetScheduleDTO } from "./dto/GetScheduleDTO";
import { GetDynamicLessonsDTO } from "./dto/GetDynamicLessonsDTO";
import { CreateLessonBody } from "./dto/CreateLessonBody";
import { GetLessonDTO } from "./dto/GetLessonDTO";
import { GetTeacherScheduleDTO } from "./dto/GetTeacherScheduleDTO";
import { UpdateStaticLessonBody } from "./dto/UpdateStaticLessonBody";
import { UpdateDynamicLessonBody } from "./dto/UpdateDynamicLessonBody";

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
                                   fortnight?: string): Promise<GetDynamicLessonsDTO>{
        return (await client.get(`schedule/groups/${id}/temporary/${fortnight}`,
            getAuthorizationHeader(accessToken))).data;
    }
    
     static async createLesson(accessToken: string, body: CreateLessonBody) {
        return (await client.post(
            `/schedule`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

    static async updateStaticLesson(accessToken: string, lessonId: string, body: UpdateStaticLessonBody) {
        return (await client.patch(
            `/schedule/lessons/static/${lessonId}`,
            body,
            getAuthorizationHeader(accessToken)
        ));
    }

    static async updateDynamicLesson(accessToken: string, id: string, fortnight: string, body: UpdateDynamicLessonBody) {
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

    static async getTeacherSchedule(accessToken: string, teacherId: string, fortnight?: string): Promise<GetTeacherScheduleDTO> {
        return (await client.get(`/schedule/teachers/${teacherId}/static/${fortnight}`
            , getAuthorizationHeader(accessToken))).data;
    }
}
