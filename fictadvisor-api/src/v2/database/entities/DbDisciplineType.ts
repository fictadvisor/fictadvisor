import { DisciplineTypeEnum } from '@fictadvisor/utils/enums';

export class DbDisciplineType {
  id: string;
  disciplineId: string;
  name: DisciplineTypeEnum;
  createdAt: Date;
  updatedAt: Date;
}
