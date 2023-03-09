import { DisciplineTypeEnum } from '@prisma/client';

export interface TemporaryLessonData {
  id: string,
  startDate: Date,
  endDate: Date,
  type: DisciplineTypeEnum,
  subjectName: string,
}