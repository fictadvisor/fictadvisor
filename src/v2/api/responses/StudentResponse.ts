import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserResponse } from './UserResponse';
import { ExtendedGroupResponse, GroupResponse } from './GroupResponse';
import { RoleWithStudentResponse } from './RoleWithStudentResponse';

export class BaseStudentResponse {
  @ApiProperty()
    firstName: string;

  @ApiProperty()
    middleName?: string;

  @ApiProperty()
    lastName: string;
}

export class FullStudentResponse extends BaseStudentResponse {
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

export class OrdinaryStudentResponse extends BaseStudentResponse {
  @ApiProperty()
    id: string;

  @ApiProperty()
    username: string;

  @ApiProperty()
    email: string;

  @ApiProperty()
    avatar: string;

  @ApiProperty()
    telegramId?: number;

  @ApiPropertyOptional({
    type: ExtendedGroupResponse,
  })
    group: ExtendedGroupResponse;
}

export class StudentsResponse {
  @ApiProperty({
    type: [OrdinaryStudentResponse],
  })
    students: OrdinaryStudentResponse[];
}