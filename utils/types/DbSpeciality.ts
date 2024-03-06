import { AbbreviationOfSpeciality, EducationalPrograms } from '@prisma/client';

export class DbSpeciality {
  id: string;
  code: string;
  abbreviation: AbbreviationOfSpeciality;
  name: string;
  educationalPrograms?: EducationalPrograms[];
}