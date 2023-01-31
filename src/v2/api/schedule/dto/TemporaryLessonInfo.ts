import { type DisciplineTypeEnum } from '@prisma/client';

export interface TemporaryLessonInfo {
  id: string
  startDate: Date
  endDate: Date
  type: DisciplineTypeEnum
  subjectName: string
}
