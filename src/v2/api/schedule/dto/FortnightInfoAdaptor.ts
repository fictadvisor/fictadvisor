import { FortnightLessonInfoType } from '@prisma/client';

export const FortnightInfoAdaptor = {
  endDate: FortnightLessonInfoType.END_DATE,
  startDate: FortnightLessonInfoType.START_DATE,
  url: FortnightLessonInfoType.URL,
  homework: FortnightLessonInfoType.HOMEWORK,
  comment: FortnightLessonInfoType.COMMENT,
  isTest: FortnightLessonInfoType.IS_TEST,
};
