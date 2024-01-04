import { DisciplineTeacher } from '@/types/teacher';

export interface PollTeachersResponse {
  teachers: DisciplineTeacher[];
  hasSelectedInLastSemester: boolean;
}
