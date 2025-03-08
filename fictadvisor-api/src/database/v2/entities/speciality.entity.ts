import { AbbreviationOfSpeciality } from '@fictadvisor/utils/enums';
import { DbEducationalProgram } from './educational-program.entity';
import { AutoMap } from '@automapper/classes';

export class DbSpeciality {
  @AutoMap()
    id: string;

  @AutoMap()
    code: string;

  @AutoMap(() => String)
    abbreviation: AbbreviationOfSpeciality;

  @AutoMap()
    name: string | null;

  @AutoMap(() => [DbEducationalProgram])
    educationalPrograms?: DbEducationalProgram[];

  createdAt: Date;
  updatedAt: Date;
}
