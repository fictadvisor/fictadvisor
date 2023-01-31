import { type DisciplineTypeEnum } from '@prisma/client';

export interface CreateDisciplineTypeDTO {
  disciplineId: string
  name: DisciplineTypeEnum
}
