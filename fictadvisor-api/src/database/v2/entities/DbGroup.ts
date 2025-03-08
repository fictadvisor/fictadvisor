import { DbStudent } from './DbStudent';
import { DbEducationalProgram } from './DbEducationalProgram';
import { DbCathedra } from './DbCathedra';
import { DbTelegramGroup } from './DbTelegramGroup';
import { DbSelectiveAmount } from './DbSelectiveAmount';
import { DbEvent } from './DbEvent';
import { DbGroupRole } from './DbGroupRole';
import { DbDiscipline } from './DbDiscipline';
import { DbComplaint } from './DbComplaint';

export class DbGroup {
  id: string;
  code: string;
  admissionYear: number;
  cathedra?: DbCathedra;
  cathedraId: string | null;
  educationalProgram?: DbEducationalProgram;
  educationalProgramId: string | null;
  events?: DbEvent[];
  students?: DbStudent[];
  userRoles?: DbGroupRole[];
  complaints?: DbComplaint[];
  disciplines?: DbDiscipline[];
  telegramGroups?: DbTelegramGroup[];
  selectiveAmounts?: DbSelectiveAmount[];
  createdAt: Date | null;
  updatedAt: Date | null;
}

