import { EducationProgram } from '@fictadvisor/utils/enums';
import { DbSpeciality } from './speciality.entity';
import { DbGroup } from './group.entity';
import { AutoMap } from '@automapper/classes';

export class DbEducationalProgram {
  @AutoMap()
    id: string;

  @AutoMap(() => DbSpeciality)
    speciality?: DbSpeciality;

  @AutoMap()
    specialityId: string;

  @AutoMap()
    name: string;

  @AutoMap(() => String)
    abbreviation: EducationProgram;

  @AutoMap(() => [DbGroup])
    groups?: DbGroup[];
}
