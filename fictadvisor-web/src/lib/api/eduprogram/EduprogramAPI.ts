import { EduProgramsResponse } from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

class EduProgramsApi {
  async getAll() {
    const { data } = await client.get<EduProgramsResponse>(
      '/eduprograms',
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new EduProgramsApi();
