import { DbStudent } from './DbStudent';
import { DbEducationalProgram } from './DbEducationalProgram';
import { DbCathedra } from './DbCathedra';
import { DbTelegramGroup } from './DbTelegramGroup';
import { DbSelectiveAmount } from './DbSelectiveAmount';
import { DbEvent } from './DbEvent';
import { DbGroupRole } from './DbGroupRole';
import { DbDiscipline } from './DbDiscipline';
import { DbComplaint } from './DbComplaint';
import { AutoMap } from '@automapper/classes';
import { DbUserRole } from './DbUserRole';

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

  @AutoMap(() => [DbUserRole])
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

