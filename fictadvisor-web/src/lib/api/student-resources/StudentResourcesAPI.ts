import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

class StudentResourcesAPI {
  async editStudentResources(data: object[]) {
    return await client.patch(
      '/studentResources',
      { resources: data },
      getAuthorizationHeader(),
    );
  }
  async getAll() {
    const { data } = await client.get('/studentResources');
    return data;
  }
}

export default new StudentResourcesAPI();
