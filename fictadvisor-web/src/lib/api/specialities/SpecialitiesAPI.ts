import { SpecialitiesResponse } from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';

class SpecialitiesAPI {
  async getAll() {
    const { data } = await client.get<SpecialitiesResponse>('/specialities');
    return data;
  }
}

export default new SpecialitiesAPI();
