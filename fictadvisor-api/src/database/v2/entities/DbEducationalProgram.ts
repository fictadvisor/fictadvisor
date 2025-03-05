import { Group, Speciality } from '@prisma/client/fictadvisor';
import { EducationProgram } from '@fictadvisor/utils/enums';

export class DbEducationalProgram {
  id: string;
  speciality?: Speciality;
  specialityId: string;
  name: string;
  abbreviation: EducationProgram;
  groups?: Group[];
}
