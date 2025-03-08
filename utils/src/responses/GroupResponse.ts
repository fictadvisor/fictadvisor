import { ApiProperty } from '@nestjs/swagger';
import { RoleName, State } from '../enums';
import { AutoMap } from '@automapper/classes';

export class GroupResponse {
  @ApiProperty({
    description: 'Id of the group',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Group code string',
  })
  @AutoMap()
    code: string;
}

export class ExtendedGroupResponse extends GroupResponse {
  @ApiProperty({
    enum: State,
    description: 'State for the student in group',
  })
  @AutoMap(() => String)
    state: State;

  @ApiProperty({
    enum: RoleName,
    description: 'User\'s role in the group',
  })
  @AutoMap(() => String)
    role: RoleName;
}

export class FullGroupResponse extends GroupResponse {
  @ApiProperty({
    description: 'Id of the educational program',
  })
  @AutoMap()
    educationalProgramId: string;

  @ApiProperty({
    description: 'Id of the cathedra',
  })
  @AutoMap()
    cathedraId: string;
}
