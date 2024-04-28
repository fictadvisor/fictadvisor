import { EducationalPrograms } from '@prisma/client';
import { AbbreviationOfSpeciality } from '@fictadvisor/utils/enums';

export class DbSpeciality {
  id: string;
  code: string;
  abbreviation: AbbreviationOfSpeciality;
  name: string | null;
  educationalPrograms?: EducationalPrograms[];
  createdAt?: Date;
  updatedAt?: Date;
}