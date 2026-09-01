import { EducationProgram } from '@fictadvisor/utils/enums';
import { DbBaseSpeciality } from './speciality.entity';
import { DbBaseGroup } from './group.entity';
import { AutoMap } from '@automapper/classes';

export class DbBaseEducationalProgram {
  @AutoMap()
    id: string;

  @AutoMap()
    specialityId: string;

  @AutoMap()
    name: string;

  @AutoMap(() => String)
    abbreviation: EducationProgram;
}

/** GroupRepository, StudentRepository: `educationalProgram: { speciality: true }` */
export class DbEducationalProgramWithSpeciality extends DbBaseEducationalProgram {
  @AutoMap(() => DbBaseSpeciality)
    speciality: DbBaseSpeciality;
}

/** EduProgramRepository */
export class DbEducationalProgram extends DbEducationalProgramWithSpeciality {
  @AutoMap(() => [DbBaseGroup])
    groups: DbBaseGroup[];
}
