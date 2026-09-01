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

/**
 * The group a student belongs to. A student can be groupless, in which case
 * every field but `state` comes back null — hence this does not extend
 * `GroupResponse`, whose `id`/`code` are always present.
 */
export class ExtendedGroupResponse {
  @ApiProperty({
    description: 'Id of the group, null if the student has none',
    nullable: true,
  })
  @AutoMap()
    id: string | null;

  @ApiProperty({
    description: 'Group code string, null if the student has none',
    nullable: true,
  })
  @AutoMap()
    code: string | null;

  @ApiProperty({
    enum: State,
    enumName: 'State',
    description: 'State for the student in group',
  })
  @AutoMap(() => String)
    state: State;

  @ApiProperty({
    enum: RoleName,
    enumName: 'RoleName',
    description: 'User\'s role in the group, null if the student has none',
    nullable: true,
  })
  @AutoMap(() => String)
    role: RoleName | null;
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
