import { ApiProperty } from '@nestjs/swagger';
import { AbbreviationOfSpeciality } from '@prisma/client';

export class SpecialityResponse {
  @ApiProperty({
    description: 'Speciality id',
  })
    id: string;
  
  @ApiProperty({
    description: 'Speciality code',
  })
    code: string;
  
  @ApiProperty({
    description: 'Speciality abbreviation',
    enum: AbbreviationOfSpeciality,
  })
    abbreviation: AbbreviationOfSpeciality;
  
  @ApiProperty({
    description: 'Speciality name',
  })
    name: string;
} 

export class SpecialityResponses {
  @ApiProperty({
    description: 'Array of specialities',
    type: [SpecialityResponse],
  })
    specialities: SpecialityResponse[];
}