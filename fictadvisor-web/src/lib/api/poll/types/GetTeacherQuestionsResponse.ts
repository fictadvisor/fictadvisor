import { Category, PollTeacher } from '@/types/poll';
import { TeacherSubject } from '@/types/teacher';

export interface GetTeacherQuestionsResponse {
  teacher: PollTeacher;
  subject: TeacherSubject;
  categories: Category[];
}
