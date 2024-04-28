import { createContext } from 'react';
import { TeacherWithContactsFullResponse } from '@fictadvisor/utils/responses';

import { TeacherSubjectContext } from '../types/TeacherSubjectContext';

const teacherSubjectContext = createContext<TeacherSubjectContext>({
  subjectFloatingCardShowed: false,
  setSubjectFloatingCardShowed: () => {},
  teacher: {} as TeacherWithContactsFullResponse,
});

export default teacherSubjectContext;
