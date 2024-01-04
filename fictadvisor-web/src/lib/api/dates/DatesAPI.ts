import { GetCurrentSemester } from '@/lib/api/dates/types/GetCurrentSemester';
import { GetDates } from '@/lib/api/dates/types/GetDates';
import { client } from '@/lib/api/instance';
class DatesAPI {
  async getDates(isFinished = false) {
    const { data } = await client.get<GetDates>(`dates/semesters`, {
      params: {
        isFinished,
      },
    });

    return data;
  }

  async getCurrentSemester() {
    const { data } = await client.get<GetCurrentSemester>(
      'dates/current/semester',
    );
    return data;
  }
}
export default new DatesAPI();
