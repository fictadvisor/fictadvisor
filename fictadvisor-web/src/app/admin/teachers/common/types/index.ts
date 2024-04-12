import { Pagination } from '@/types/api';
import { Teacher, TeacherComment, TeacherQuestion } from '@/types/teacher';

export interface PersonalInfo
  extends Pick<
    Teacher,
    'firstName' | 'middleName' | 'lastName' | 'avatar' | 'description'
  > {}

export interface TeacherCommentAdmin extends TeacherComment {
  disciplineTeacherId: string;
  userId: string;
  questionId: string;
}

export interface TeacherQuestionAdmin extends TeacherQuestion {
  id: string;
  comments: TeacherCommentAdmin[];
  pagination: Pagination;
}
