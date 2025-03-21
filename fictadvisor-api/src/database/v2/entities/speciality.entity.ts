import { AbbreviationOfSpeciality } from '@fictadvisor/utils/enums';
import { DbEducationalProgram } from './educational-program.entity';

export class DbSpeciality {
  id: string;
  code: string;
  abbreviation: AbbreviationOfSpeciality;
  name: string | null;
  educationalPrograms?: DbEducationalProgram[];
  createdAt: Date;
  updatedAt: Date;
}
