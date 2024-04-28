import {
  QueryAllResourcesDTO,
  UpdateResourcesDTO,
} from '@fictadvisor/utils/requests';
import {
  ResourceResponse,
  ResourcesResponse,
} from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';
import { getAuthorizationHeader } from '@/lib/api/utils';

class StudentResourcesAPI {
  async editStudentResources(body: UpdateResourcesDTO) {
    const { data } = await client.patch<ResourcesResponse>(
      '/studentResources',
      body,
      getAuthorizationHeader(),
    );
    return data;
  }
  async getAll(params: QueryAllResourcesDTO = {}) {
    const { data } = await client.get<ResourceResponse[]>('/studentResources', {
      params,
    });
    return data;
  }
}

export default new StudentResourcesAPI();
