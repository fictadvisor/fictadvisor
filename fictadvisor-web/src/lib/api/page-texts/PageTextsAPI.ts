import {
  QueryAllPageTextsDTO,
  UpdatePageTextsDTO,
} from '@fictadvisor/utils/requests';
import { PageTextsResponse } from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

class PageTextsAPI {
  async editPageTexts(body: UpdatePageTextsDTO) {
    return await client.patch<PageTextsResponse>(
      '/pageTexts',
      body,
      getAuthorizationHeader(),
    );
  }
  async getAll(params: QueryAllPageTextsDTO) {
    const { data } = await client.get<PageTextsResponse>(`/pageTexts`, {
      params,
    });
    return data;
  }
}
export default new PageTextsAPI();
