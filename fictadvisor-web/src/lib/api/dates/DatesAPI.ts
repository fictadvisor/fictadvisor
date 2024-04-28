import {
  CurrentSemester,
  SemestersResponse,
} from '@fictadvisor/utils/responses';

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
}
export default new DatesAPI();
