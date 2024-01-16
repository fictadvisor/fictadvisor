import { GetAllResponse } from '@/lib/api/cathera/types/GetAllResponse';

import { client } from '../instance';

class CathedraAPI {
  async getAll() {
    const res = await client.get<GetAllResponse>('/cathedras');
    return res.data;
  }
}

export default new CathedraAPI();
