import { ApiProperty } from '@nestjs/swagger';

class StudentRoleResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    weight: number;

  @ApiProperty()
    parentId?: string;

  @ApiProperty()
    displayName?: string;
}

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
    type: StudentRoleResponse,
  })
    role: StudentRoleResponse;
}
