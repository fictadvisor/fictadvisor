import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './CathedraResponse';
import { GroupResponse } from './GroupResponse';
import { SpecialityResponse } from './SpecialityResponse';
import { BaseStudentResponse } from './StudentResponse';

export class MappedGroupResponse extends GroupResponse {
  @ApiProperty({
    description: 'Id of the educational program',
  })
    educationalProgramId?: string;

  @ApiProperty({
    description: 'Year of admission the group',
  })
    admissionYear: number;

  @ApiProperty({
    description: 'Cathedra of the group',
    type: CathedraResponse,
  })
    cathedra: CathedraResponse;
  
  @ApiProperty({
    description: 'Captain of the group',
    type: BaseStudentResponse,
  })
    captain: BaseStudentResponse;
  
  @ApiProperty({
    description: 'Speciality of the group',
    type: SpecialityResponse,
  })
    speciality: SpecialityResponse;
}

