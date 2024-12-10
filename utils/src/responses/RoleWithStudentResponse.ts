import { ApiProperty } from '@nestjs/swagger';
import { BaseRoleWithParentResponse } from './RoleResponse';


export class RoleWithStudentResponse {
  @ApiProperty({
    description: 'Student\'s id',
  })
    studentId: string;

  @ApiProperty({
    description: 'Role id of a student',
  })
    roleId: string;

  @ApiProperty({
    description: 'Student\'s role',
    type: BaseRoleWithParentResponse,
  })
    role: BaseRoleWithParentResponse;
}
