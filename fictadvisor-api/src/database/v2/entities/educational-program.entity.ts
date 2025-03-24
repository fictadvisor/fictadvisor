import { EducationProgram } from '@fictadvisor/utils/enums';
import { DbSpeciality } from './speciality.entity';
import { DbGroup } from './group.entity';

export class DbEducationalProgram {
  id: string;
  speciality?: DbSpeciality;
  specialityId: string;
  name: string;
  abbreviation: EducationProgram;
  groups?: DbGroup[];
}
