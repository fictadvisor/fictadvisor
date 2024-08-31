import {
  EventFiltrationDTO,
  GeneralEventFiltrationDTO,
} from '@fictadvisor/utils/requests';
import { CurrentSemester } from '@fictadvisor/utils/responses';

import GroupAPI from '@/lib/api/group/GroupAPI';
import { client } from '@/lib/api/instance';
import { CreateEventDTO } from '@/lib/api/schedule/types/CreateEventDTO';
import { EventResponse } from '@/lib/api/schedule/types/EventResponse';
import { EventsResponse } from '@/lib/api/schedule/types/EventsResponse';
import { GeneralEventsResponse } from '@/lib/api/schedule/types/GeneralEventsResponse';
import { getDisciplinesAndTeachers } from '@/lib/api/schedule/types/getDisciplinesAndTeachers';
import { UpdateEventDTO } from '@/lib/api/schedule/types/UpdateEventDTO';
import TeacherAPI from '@/lib/api/teacher/TeacherAPI';

class ScheduleAPI {
  async getEvents(
    groupId: string,
    week: number,
    {
      addLecture = true,
      addLaboratory = true,
      addPractice = true,
    }: GeneralEventFiltrationDTO = {},
  ) {
    const { data } = await client.get<GeneralEventsResponse>(
      `schedule/groups/${groupId}/general`,
      { params: { week, addLecture, addLaboratory, addPractice } },
    );
    return data;
  }

  async getEventsAuthorized(
    groupId: string,
    week: number,
    {
      showOwnSelective,
      addLecture = true,
      addLaboratory = true,
      addPractice = true,
      addOtherEvents = true,
    }: EventFiltrationDTO = {},
  ): Promise<EventsResponse> {
    const { data } = await client.get<EventsResponse>(
      `schedule/groups/${groupId}/events`,
      {
        params: {
          week,
          showOwnSelective,
          addLecture,
          addLaboratory,
          addPractice,
          addOtherEvents,
        },
      },
    );
    return data;
  }
  async getEventInfo(eventId: string, week: number): Promise<EventResponse> {
    const { data } = await client.get<EventResponse>(
      `schedule/events/${eventId}`,
      {
        params: { week },
      },
    );

    return data;
  }

  async deleteEventById(
    groupId: string,
    eventId: string,
  ): Promise<EventResponse> {
    const { data } = await client.delete<EventResponse>(
      `schedule/groups/${groupId}/events/${eventId}`,
    );
    return data;
  }

  async addEvent(body: CreateEventDTO): Promise<EventResponse> {
    const { data } = await client.post<EventResponse>(`schedule/events`, body);
    return data;
  }

  async editEvent(
    groupId: string,
    eventId: string,
    body: UpdateEventDTO,
  ): Promise<EventResponse> {
    const { data } = await client.patch<EventResponse>(
      `schedule/groups/${groupId}/events/${eventId}`,
      body,
    );
    return data;
  }

  async getDisciplinesAndTeachers(
    groupId: string,
    semester: CurrentSemester,
  ): Promise<getDisciplinesAndTeachers> {
    const [teachers, disciplines] = await Promise.all([
      TeacherAPI.getAll(),
      GroupAPI.getDisciplines(groupId, semester),
    ]);
    return {
      teachers,
      disciplines,
    };
  }
}
export default new ScheduleAPI();
