import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { client } from '@/lib/api/instance';
import { DetailedEventBody } from '@/lib/api/schedule/types/DetailedEventBody';
import { getDisciplinesAndTeachers } from '@/lib/api/schedule/types/getDisciplinesAndTeachers';
import { GetEventBody } from '@/lib/api/schedule/types/GetEventBody';
import { PatchEventBody } from '@/lib/api/schedule/types/PatchEventBody';
import { PostEventBody } from '@/lib/api/schedule/types/PostEventBody';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';
import { getAuthorizationHeader } from '@/lib/api/utils';
class ScheduleAPI {
  async getEvents(
    groupId: string,
    week: number,
    addLecture = true,
    addLaboratory = true,
    addPractice = true,
  ) {
    const { data } = await client.get<GetEventBody>(
      `schedule/groups/${groupId}/general`,
      { params: { week, addLecture, addLaboratory, addPractice } },
    );
    return data;
  }

  async getEventsAuthorized(
    groupId: string,
    week: number,
    isOwnSelected: boolean,
    addLecture = true,
    addLaboratory = true,
    addPractice = true,
    otherEvents = true,
  ): Promise<GetEventBody> {
    const { data } = await client.get<GetEventBody>(
      `schedule/groups/${groupId}/events`,
      {
        ...getAuthorizationHeader(),
        params: {
          week,
          isOwnSelected,
          addLecture,
          addLaboratory,
          addPractice,
          otherEvents,
        },
      },
    );
    return data;
  }
  async getEventInfo(
    eventId: string,
    week: number | string,
  ): Promise<DetailedEventBody> {
    const { data } = await client.get<DetailedEventBody>(
      `schedule/events/${eventId}`,
      {
        ...getAuthorizationHeader(),
        params: { week },
      },
    );

    return data;
  }

  async deleteEventById(
    groupId: string,
    eventId: string,
  ): Promise<DetailedEventBody> {
    const { data } = await client.delete<DetailedEventBody>(
      `schedule/groups/${groupId}/events/${eventId}`,
      getAuthorizationHeader(),
    );
    return data;
  }

  async addEvent(
    body: PostEventBody,
    groupId: string,
  ): Promise<DetailedEventBody> {
    const { data } = await client.post<DetailedEventBody>(
      `schedule/events`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async editEvent(
    body: PatchEventBody,
    groupId: string,
    eventId: string,
  ): Promise<DetailedEventBody> {
    const { data } = await client.patch<DetailedEventBody>(
      `schedule/groups/${groupId}/events/${eventId}`,
      body,
      getAuthorizationHeader(),
    );
    return data;
  }

  async getDisciplinesAndTeachers(
    groupId: string,
    semester: GetCurrentSemester,
  ): Promise<getDisciplinesAndTeachers> {
    const [teachers, disciplines] = await Promise.all([
      TeacherAPI.getAll(),
      GroupAPI.getDisciplines(groupId, semester.semester, semester.year),
    ]);
    return {
      teachers,
      disciplines,
    };
  }
}
export default new ScheduleAPI();
