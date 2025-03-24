import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './cathedra.response';
import { GroupResponse } from './group.response';
import { SpecialityResponse } from './speciality.response';
import { BaseStudentResponse } from './student.response';

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

