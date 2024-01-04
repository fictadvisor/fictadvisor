import { Teacher } from '@/types/teacher';

export interface GetTeachersBySubjectResponse {
  subjectName: string;
  teachers: Teacher[];
}
