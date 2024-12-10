import {
  QueryAllResourcesDTO,
  UpdateResourcesDTO,
} from '@fictadvisor/utils/requests';
import { ResourcesResponse } from '@fictadvisor/utils/responses';

import { client } from '@/lib/api/instance';

class StudentResourcesAPI {
  async editStudentResources(
    body: UpdateResourcesDTO,
  ): Promise<ResourcesResponse> {
    const { data } = await client.patch<ResourcesResponse>(
      '/studentResources',
      body,
    );
    return data;
  }
  async getAll(params: QueryAllResourcesDTO = {}): Promise<ResourcesResponse> {
    const { data } = await client.get<ResourcesResponse>('/studentResources', {
      params,
    });
    return data;
  }
}

export default new StudentResourcesAPI();
