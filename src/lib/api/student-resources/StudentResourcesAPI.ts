import { client } from '@/lib/api/instance';
import { GetStudentResourcesDTO } from '@/lib/api/student-resources/dto/GetStudentResourcesDTO';

export class StudentResourcesAPI {
  static async getAll() {
    const { data } = await client.get<GetStudentResourcesDTO>(
      '/studentResources',
    );
    return data;
  }
}
