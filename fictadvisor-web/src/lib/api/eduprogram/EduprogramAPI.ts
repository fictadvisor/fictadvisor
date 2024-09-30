import { EduProgramsResponse } from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';

class EduProgramsApi {
  async getAll() {
    const { data } = await client.get<EduProgramsResponse>('/eduprograms');
    return data;
  }
}

export default new EduProgramsApi();
