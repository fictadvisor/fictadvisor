import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './UserResponse';
import { GroupResponse } from './GroupResponse';
import { RoleWithStudentResponse } from './RoleWithStudentResponse';

export class StudentResponse {
  @ApiProperty()
    firstName: string;

  @ApiProperty()
    middleName?: string;

  @ApiProperty()
    lastName: string;

  @ApiProperty({
    type: UserResponse,
  })
    user: UserResponse;

  @ApiProperty({
    type: GroupResponse,
  })
    group: GroupResponse;

  @ApiProperty({
    type: [RoleWithStudentResponse],
  })
    roles: RoleWithStudentResponse[];
}
