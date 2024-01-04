import { GetGroupDisciplines } from '@/lib/api/group/types/GetGroupDisciplines';
import { GetTeachersResponse } from '@/lib/api/teacher/types/GetTeachersResponse';
export interface getDisciplinesAndTeachers {
  disciplines: GetGroupDisciplines;
  teachers: GetTeachersResponse;
}
