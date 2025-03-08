import { DbStudent } from './student.entity';
import { DbEducationalProgram } from './educational-program.entity';
import { DbCathedra } from './cathedra.entity';
import { DbTelegramGroup } from './telegram-group.entity';
import { DbSelectiveAmount } from './selective-amount.entity';
import { DbEvent } from './event.entity';
import { DbGroupRole } from './group-role.entity';
import { DbDiscipline } from './discipline.entity';
import { DbComplaint } from './complaint.entity';
import { AutoMap } from '@automapper/classes';

export class DbGroup {
  @AutoMap()
    id: string;

  @AutoMap()
    code: string;

  @AutoMap()
    admissionYear: number;

  @AutoMap(() => DbCathedra)
    cathedra?: DbCathedra;

  @AutoMap()
    cathedraId: string | null;

  @AutoMap(() => DbEducationalProgram)
    educationalProgram?: DbEducationalProgram;

  @AutoMap()
    educationalProgramId: string | null;

  @AutoMap(() => [DbEvent])
    events?: DbEvent[];

  @AutoMap(() => [DbStudent])
    students?: DbStudent[];

  @AutoMap(() => [DbGroupRole])
    userRoles?: DbGroupRole[];

  @AutoMap(() => [DbComplaint])
    complaints?: DbComplaint[];

  @AutoMap(() => [DbDiscipline])
    disciplines?: DbDiscipline[];

  @AutoMap(() => [DbTelegramGroup])
    telegramGroups?: DbTelegramGroup[];

  @AutoMap(() => [DbSelectiveAmount])
    selectiveAmounts?: DbSelectiveAmount[];

  createdAt: Date | null;
  updatedAt: Date | null;
}

