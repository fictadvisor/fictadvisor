import { ApiProperty } from '@nestjs/swagger';
import { State, RoleName } from '@prisma/client';

export class GroupResponse {
  @ApiProperty({
    description: 'Id of the group',
  })
    id: string;

  @ApiProperty({
    description: 'Group code string',
  })
    code: string;
}

export class ExtendedGroupResponse extends GroupResponse {
  @ApiProperty({
    enum: State,
    description: 'State for the student in group',
  })
    state: State;

  @ApiProperty({
    enum: RoleName,
    description: 'User\'s role in the group',
  })
    role: RoleName;
}

export class FullGroupResponse extends GroupResponse {
  @ApiProperty({
    description: 'Id of the educational program',
  })
    educationalProgramId: string;

  @ApiProperty({
    description: 'Id of the cathedra',
  })
    cathedraId: string;
}