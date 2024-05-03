import { createContext } from 'react';

import { TeacherWithSubject } from '@/types/teacher';

import { TeacherSubjectContext } from '../types/TeacherSubjectContext';

const teacherSubjectContext = createContext<TeacherSubjectContext>({
  subjectFloatingCardShowed: false,
  setSubjectFloatingCardShowed: () => {},
  teacher: {} as TeacherWithSubject,
});

export default teacherSubjectContext;
