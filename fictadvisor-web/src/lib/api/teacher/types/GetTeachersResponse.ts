import { Meta } from '@/types/api';
import { Teacher } from '@/types/teacher';

export interface GetTeachersResponse {
  teachers: Omit<Teacher, 'role'>[];
  meta?: Meta;
}
