import { client } from '@/lib/api/instance';
import { GetPageTextsResponse } from '@/lib/api/page-texts/types/GetPageTextsResponse';
import { getAuthorizationHeader } from '@/lib/api/utils';

class PageTextsAPI {
  async editPageTexts(data: object[]) {
    return await client.patch(
      '/pageTexts',
      { pageTexts: data },
      getAuthorizationHeader(),
    );
  }
  async getAll(keys: string[]) {
    let query = '';
    keys.forEach((key, index) => {
      query += `keys[${index}]=${key}&`;
    });
    const { data } = await client.get<GetPageTextsResponse>(
      `/pageTexts?${query}`,
      getAuthorizationHeader(),
    );
    return data;
  }
}
export default new PageTextsAPI();
