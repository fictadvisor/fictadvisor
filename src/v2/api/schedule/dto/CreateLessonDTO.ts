import { DisciplineTypeEnum } from '@prisma/client';

export interface CreateLessonDTO {
  fortnight?: number,
  startDate: Date,
  endDate: Date,
  disciplineId: string,
  teacherId: string,
  type: DisciplineTypeEnum,
}