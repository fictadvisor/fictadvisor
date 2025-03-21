import { DbStudent } from './student.entity';
import { DbEducationalProgram } from './educational-program.entity';
import { DbCathedra } from './cathedra.entity';
import { DbTelegramGroup } from './telegram-group.entity';
import { DbSelectiveAmount } from './selective-amount.entity';
import { DbEvent } from './event.entity';
import { DbGroupRole } from './group-role.entity';
import { DbDiscipline } from './discipline.entity';
import { DbComplaint } from './complaint.entity';

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

