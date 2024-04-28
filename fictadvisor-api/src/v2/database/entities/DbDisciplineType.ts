import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';

export class DbDisciplineType {
  id: string;
  disciplineId: DisciplineTypeEnum;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}