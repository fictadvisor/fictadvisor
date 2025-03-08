import { ApiProperty } from '@nestjs/swagger';
import { AbbreviationOfSpeciality } from '../enums';
import { AutoMap } from '@automapper/classes';

export class SpecialityResponse {
  @ApiProperty({
    description: 'Speciality id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Speciality code',
  })
  @AutoMap()
    code: string;

  @ApiProperty({
    description: 'Speciality abbreviation',
    enum: AbbreviationOfSpeciality,
  })
  @AutoMap(() => String)
    abbreviation: AbbreviationOfSpeciality;

  @ApiProperty({
    description: 'Speciality name',
  })
  @AutoMap()
    name: string;
}

export class SpecialitiesResponse {
  @ApiProperty({
    description: 'Array of specialities',
    type: [SpecialityResponse],
  })
    specialities: SpecialityResponse[];
}
