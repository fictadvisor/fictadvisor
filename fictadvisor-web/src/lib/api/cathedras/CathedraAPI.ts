import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

import { AllCathedrasResponse } from './types/AllCathedrasResponse';

class CathedraAPI {
  async getAll() {
    const { data } = await client.get<AllCathedrasResponse>(
      '/cathedras',
      getAuthorizationHeader(),
    );
    return data;
  }
}

export default new CathedraAPI();
