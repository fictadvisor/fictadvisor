import { ApiProperty } from '@nestjs/swagger';
import { BaseRoleWithParentResponse } from './role.response';
import { AutoMap } from '@automapper/classes';


export class RoleWithStudentResponse {
  @ApiProperty({
    description: 'Student\'s id',
  })
  @AutoMap()
    studentId: string;

  @ApiProperty({
    description: 'Role id of a student',
  })
  @AutoMap()
    roleId: string;

  @ApiProperty({
    description: 'Student\'s role',
    type: BaseRoleWithParentResponse,
  })
  @AutoMap(() => BaseRoleWithParentResponse)
    role: BaseRoleWithParentResponse;
}
