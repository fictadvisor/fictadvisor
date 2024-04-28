import { SpecialitiesResponse } from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

class SpecialitiesAPI {
  async getAll() {
    const { data } = await client.get<SpecialitiesResponse>(
      '/specialities',
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new SpecialitiesAPI();
