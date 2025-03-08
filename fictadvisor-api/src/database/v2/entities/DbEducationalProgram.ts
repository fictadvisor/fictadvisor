import { EducationProgram } from '@fictadvisor/utils/enums';
import { DbSpeciality } from './DbSpeciality';
import { DbGroup } from './DbGroup';

export class DbEducationalProgram {
  id: string;
  speciality?: DbSpeciality;
  specialityId: string;
  name: string;
  abbreviation: EducationProgram;
  groups?: DbGroup[];
}
