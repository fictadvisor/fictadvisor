import { DbDisciplineType } from './discipline-type.entity';
import { AutoMap } from '@automapper/classes';

/** EventRepository: `lessons: { disciplineType: true }` */
export class DbLesson {
  @AutoMap()
    id: string;

  @AutoMap()
    eventId: string;

  @AutoMap(() => String)
    disciplineTypeId: string | null;

  @AutoMap(() => DbDisciplineType)
    disciplineType: DbDisciplineType | null;

  createdAt: Date | null;
  updatedAt: Date | null;
}
