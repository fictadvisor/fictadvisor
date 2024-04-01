import { Pagination } from '@/types/api';
import { Teacher, TeacherSubject } from '@/types/teacher';

export interface Comment {
  disciplineTeacherId: string;
  questionId: string;
  userId: string;
  comment: string;
  semester: number;
  year: number;
  teacher: Pick<Teacher, 'id' | 'firstName' | 'middleName' | 'lastName'>;
  subject: TeacherSubject;
}

export interface GetCommentsWithPaginationResponse {
  comments: Comment[];
  pagination: Pagination;
}
