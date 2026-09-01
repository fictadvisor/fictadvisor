import { DbStudentWithRoles } from './student.entity';
import { DbEducationalProgramWithSpeciality } from './educational-program.entity';
import { DbBaseCathedra } from './cathedra.entity';
import { DbBaseTelegramGroup } from './telegram-group.entity';
import { DbSelectiveAmount } from './selective-amount.entity';
import { AutoMap } from '@automapper/classes';

export class DbBaseGroup {
  @AutoMap()
    id: string;

  @AutoMap()
    code: string;

  @AutoMap()
    admissionYear: number;

  @AutoMap(() => String)
    cathedraId: string | null;

  @AutoMap(() => String)
    educationalProgramId: string | null;

  createdAt: Date | null;
  updatedAt: Date | null;
}

/** DisciplineRepository: `group: { selectiveAmounts: true }` */
export class DbGroupWithSelectiveAmounts extends DbBaseGroup {
  @AutoMap(() => [DbSelectiveAmount])
    selectiveAmounts: DbSelectiveAmount[];
}

/** StudentRepository: `group: { cathedra: true, educationalProgram: { speciality } }` */
export class DbGroupWithCathedra extends DbBaseGroup {
  @AutoMap(() => DbBaseCathedra)
    cathedra: DbBaseCathedra | null;

  @AutoMap(() => DbEducationalProgramWithSpeciality)
    educationalProgram: DbEducationalProgramWithSpeciality | null;
}

/** GroupRepository, and GroupService.getAllByCaptain with only the captain attached. */
export class DbGroupWithStudents extends DbGroupWithCathedra {
  @AutoMap(() => [DbStudentWithRoles])
    students: DbStudentWithRoles[];
}

/** GroupRepository */
export class DbGroup extends DbGroupWithStudents {
  @AutoMap(() => [DbSelectiveAmount])
    selectiveAmounts: DbSelectiveAmount[];

  @AutoMap(() => [DbBaseTelegramGroup])
    telegramGroups: DbBaseTelegramGroup[];
}
