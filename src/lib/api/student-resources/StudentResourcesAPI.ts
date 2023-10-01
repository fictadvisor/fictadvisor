import { client } from '@/lib/api/instance';
import { GetStudentResourcesResponse } from '@/lib/api/student-resources/types/GetStudentResourcesResponse';

class StudentResourcesAPI {
  async getAll() {
    const { data } =
      await client.get<GetStudentResourcesResponse>('/studentResources');
    return data;
  }
}

export default new StudentResourcesAPI();
