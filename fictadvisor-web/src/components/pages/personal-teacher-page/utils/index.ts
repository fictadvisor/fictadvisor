import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { NextRouter } from 'next/router';

import { TeacherPageInfo } from '@/lib/services/teacher/types';
import { Teacher } from '@/types/teacher';

export enum TeachersPageTabs {
  GENERAL = 'general',
  SUBJECTS = 'subjects',
  COMMENTS = 'reviews',
}

export interface PersonalTeacherPageProps {
  isLoading: boolean;
  isError: boolean;
  teacher: Teacher;
  data: TeacherPageInfo | undefined;
  query: NextParsedUrlQuery;
  teacherId: string;
  router: NextRouter;
}
