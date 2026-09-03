import {
  CreateSemesterDateDTO,
  UpdatePollDatesDTO,
  UpdateSemesterDateDTO,
} from '@fictadvisor/utils/requests';
import {
  CurrentSemester,
  PollDatesListResponse,
  PollDatesResponse,
  SemestersResponse,
} from '@fictadvisor/utils/responses';
import { StudyingSemester } from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';

class DatesAPI {
  async getDates(isFinished = false) {
    const { data } = await client.get<SemestersResponse>(`dates/semesters`, {
      params: {
        isFinished,
      },
    });

    return data;
  }

  async getCurrentSemester() {
    const { data } = await client.get<CurrentSemester>(
      'dates/current/semester',
    );
    return data;
  }

  // Unlike `getDates`, this one also returns semesters that have not started.
  async getAllSemesters(): Promise<SemestersResponse> {
    const { data } = await client.get<SemestersResponse>('dates/semesters/all');
    return data;
  }

  async createSemester(body: CreateSemesterDateDTO): Promise<StudyingSemester> {
    const { data } = await client.post<StudyingSemester>(
      'dates/semesters',
      body,
    );
    return data;
  }

  async updateSemester(
    year: number,
    semester: number,
    body: UpdateSemesterDateDTO,
  ): Promise<StudyingSemester> {
    const { data } = await client.patch<StudyingSemester>(
      `dates/semesters/${year}/${semester}`,
      body,
    );
    return data;
  }

  async deleteSemester(year: number, semester: number): Promise<void> {
    await client.delete(`dates/semesters/${year}/${semester}`);
  }

  async getPollDates(): Promise<PollDatesListResponse> {
    const { data } = await client.get<PollDatesListResponse>('dates/pollDates');
    return data;
  }

  async deletePollDates(year: number, semester: number): Promise<void> {
    await client.delete(`dates/pollDates/${year}/${semester}`);
  }

  async updatePollDates(
    year: number,
    semester: number,
    body: UpdatePollDatesDTO,
  ): Promise<PollDatesResponse> {
    const { data } = await client.put<PollDatesResponse>(
      `dates/pollDates/${year}/${semester}`,
      body,
    );
    return data;
  }
}
export default new DatesAPI();
