import { createContext } from 'react';
import { TeacherWithContactsResponse } from '@fictadvisor/utils/responses';

import { TeacherContext } from '@/app/(main)/(search-pages)/teachers/[teacherId]/page';
import { TeacherPageInfo } from '@/lib/services/teacher/types';

export enum TeachersPageTabs {
  GENERAL = 'general',
  SUBJECTS = 'subjects',
  COMMENTS = 'reviews',
}

export interface PersonalTeacherPageProps {
  isLoading?: boolean;
  isError?: boolean;
  teacher: TeacherWithContactsResponse;
  data?: TeacherPageInfo | undefined;
  teacherId: string;
  info?: TeacherWithContactsResponse;
}

export const teacherContext = createContext<TeacherContext>({
  floatingCardShowed: false,
  setFloatingCardShowed: () => {},
  teacher: {} as TeacherWithContactsResponse,
});
