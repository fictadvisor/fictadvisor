import { TeacherComment } from '@/types/teacher';

export interface EditedComment extends Omit<TeacherComment, 'comment'> {
  comment: string;
  questionId: string;
  userId: string;
  disciplineTeacherId: string;
}
