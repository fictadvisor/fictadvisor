import { Teacher, TeacherComment } from '@/types/teacher';

export interface PersonalInfo
  extends Pick<
    Teacher,
    | 'firstName'
    | 'middleName'
    | 'lastName'
    | 'avatar'
    | 'description'
    | 'avatar'
  > {}

export interface EditedComment extends Omit<TeacherComment, 'comment'> {
  oldComment: string;
  newComment: string;
}
