import { ApiProperty } from '@nestjs/swagger';

class RoleResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    name: string;

  @ApiProperty()
    weight: number;

  @ApiProperty()
    parentId?: string;
}

export class RoleWithStudentResponse {
  @ApiProperty()
    studentId: string;

  @ApiProperty()
    roleId: string;

  @ApiProperty({
    type: RoleResponse,
  })
    role: RoleResponse;
}
