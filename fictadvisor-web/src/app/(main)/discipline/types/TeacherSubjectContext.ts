import { Dispatch, SetStateAction } from 'react';
import { TeacherWithContactsFullResponse } from '@fictadvisor/utils/responses';

export interface TeacherSubjectContext {
  subjectFloatingCardShowed: boolean;
  setSubjectFloatingCardShowed: Dispatch<SetStateAction<boolean>>;
  teacher: TeacherWithContactsFullResponse;
}
