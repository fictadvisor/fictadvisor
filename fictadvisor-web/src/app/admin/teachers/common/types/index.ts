import {
  CreateTeacherDTO,
  UpdateTeacherDTO,
} from '@fictadvisor/utils/requests';

import { TeacherComment } from '@/types/teacher';

export interface TeacherCommentAdmin extends TeacherComment {
  disciplineTeacherId: string;
  userId: string;
  questionId: string;
}

export type PersonalInfo = CreateTeacherDTO | UpdateTeacherDTO;
