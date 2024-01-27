import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { GetAllResponse } from './types/GetAllResponse';

class SpecialitiesAPI {
  async getAll() {
    const { data } = await client.get<GetAllResponse>(
      '/specialities',
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new SpecialitiesAPI();
