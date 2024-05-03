import { Dispatch, SetStateAction } from 'react';

import { TeacherWithSubject } from '@/types/teacher';

export interface TeacherSubjectContext {
  subjectFloatingCardShowed: boolean;
  setSubjectFloatingCardShowed: Dispatch<SetStateAction<boolean>>;
  teacher: TeacherWithSubject;
}
