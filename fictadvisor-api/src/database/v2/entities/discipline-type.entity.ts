import { DisciplineTypeEnum } from '@prisma-client/fictadvisor';
import { AutoMap } from '@automapper/classes';

export class DbDisciplineType {
  @AutoMap()
    id: string;

  @AutoMap()
    disciplineId: string;

  @AutoMap(() => String)
    name: DisciplineTypeEnum;

  createdAt: Date | null;
  updatedAt: Date | null;
}
