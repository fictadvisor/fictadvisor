import { ApiProperty } from '@nestjs/swagger';
import { CathedraResponse } from './cathedra.response';
import { GroupResponse } from './group.response';
import { SpecialityResponse } from './speciality.response';
import { BaseStudentResponse } from './student.response';
import { AutoMap } from '@automapper/classes';

export class MappedGroupResponse extends GroupResponse {
  @ApiProperty({
    description: 'Id of the educational program',
  })
  @AutoMap()
    educationalProgramId?: string;

  @ApiProperty({
    description: 'Year of admission the group',
  })
  @AutoMap()
    admissionYear: number;

  @ApiProperty({
    description: 'Cathedra of the group',
    type: CathedraResponse,
  })
  @AutoMap(() => CathedraResponse)
    cathedra: CathedraResponse;

  @ApiProperty({
    description: 'Captain of the group',
    type: BaseStudentResponse,
  })
  @AutoMap(() => BaseStudentResponse)
    captain: BaseStudentResponse;

  @ApiProperty({
    description: 'Speciality of the group',
    type: SpecialityResponse,
  })
  @AutoMap(() => SpecialityResponse)
    speciality: SpecialityResponse;
}

