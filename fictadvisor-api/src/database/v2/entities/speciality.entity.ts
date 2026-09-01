import { AbbreviationOfSpeciality } from '@fictadvisor/utils/enums';
import { DbBaseEducationalProgram } from './educational-program.entity';
import { AutoMap } from '@automapper/classes';

export class DbBaseSpeciality {
  @AutoMap()
    id: string;

  @AutoMap()
    code: string;

  @AutoMap(() => String)
    abbreviation: AbbreviationOfSpeciality;

  @AutoMap(() => String)
    name: string | null;

  createdAt: Date;
  updatedAt: Date;
}

/** SpecialityRepository: `educationalPrograms: true` */
export class DbSpeciality extends DbBaseSpeciality {
  @AutoMap(() => [DbBaseEducationalProgram])
    educationalPrograms: DbBaseEducationalProgram[];
}
