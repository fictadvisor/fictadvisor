import { getAuthorizationHeader } from '@/lib/api/utils';

import { client } from '../instance';

import { CreateLessonBody } from './dto/CreateLessonBody';
import { GetDynamicLessonsDTO } from './dto/GetDynamicLessonsDTO';
import { GetLessonDTO } from './dto/GetLessonDTO';
import { GetScheduleDTO } from './dto/GetScheduleDTO';
import { GetSessionScheduleDTO } from './dto/GetSessionScheduleDTO';
import { GetTeacherScheduleDTO } from './dto/GetTeacherScheduleDTO';
import { UpdateDynamicLessonBody } from './dto/UpdateDynamicLessonBody';
import { UpdateStaticLessonBody } from './dto/UpdateStaticLessonBody';

export class ScheduleAPI {
  static async getSession(groupId: string): Promise<GetSessionScheduleDTO> {
    const { data } = await client.get(
      `/group/${groupId}/session`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getSchedule(
    id: string,
    fortnight?: string,
  ): Promise<GetScheduleDTO> {
    const { data } = await client.get(
      `/groups/${id}/static/${fortnight}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getDynamicLessons(
    id: string,
    fortnight?: string,
  ): Promise<GetDynamicLessonsDTO> {
    const { data } = await client.get(
      `schedule/groups/${id}/temporary/${fortnight}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async createLesson(body: CreateLessonBody) {
    const { data } = await client.post(
      `/schedule`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async updateStaticLesson(
    lessonId: string,
    body: UpdateStaticLessonBody,
  ) {
    const { data } = await client.patch(
      `/schedule/lessons/static/${lessonId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async updateDynamicLesson(
    id: string,
    fortnight: string,
    body: UpdateDynamicLessonBody,
  ) {
    const { data } = await client.patch(
      `/schedule/lessons/static/${id}/${fortnight}}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getStaticLesson(
    id: string,
    groupId: string,
  ): Promise<GetLessonDTO> {
    const { data } = await client.get(
      `/schedule/group/${groupId}/lessons/static/${id}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getTemporaryLesson(
    id: string,
    groupId: string,
  ): Promise<GetLessonDTO> {
    const { data } = await client.get(
      `/schedule/group/${groupId}/lessons/temporary/${id}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  static async getTeacherSchedule(
    teacherId: string,
    fortnight?: string,
  ): Promise<GetTeacherScheduleDTO> {
    const { data } = await client.get(
      `/schedule/teachers/${teacherId}/static/${fortnight}`,
      getAuthorizationHeader(),
    );
    return data;
  }
}
