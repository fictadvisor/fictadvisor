import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './UserResponse';
import { ExtendedGroupResponse, GroupResponse, FullGroupResponse } from './GroupResponse';
import { RoleWithStudentResponse } from './RoleWithStudentResponse';
import { State, GroupRoles } from '../enums';
import { PaginationDataResponse } from './PaginationDataResponse';

export class BaseStudentResponse {
  @ApiProperty({
    description: 'Student\'s id',
  })
    id: string;

  @ApiProperty({
    description: 'Student\'s firstName',
  })
    firstName: string;

  @ApiProperty({
    description: 'Student\'s middleName',
  })
    middleName: string;

  @ApiProperty({
    description: 'Student\'s lastName',
  })
    lastName: string;

  @ApiProperty({
    description: 'Student\'s state',
    enum: State,
  })
    state: State;
}

export class SimpleStudentResponse extends BaseStudentResponse {
  @ApiProperty({
    description: 'Student\'s group role',
    enum: GroupRoles,
  })
    role: keyof typeof GroupRoles;

  @ApiProperty({
    type: GroupResponse,
    description: 'Student\'s group',
  })
    group: GroupResponse;
}

export class SimpleStudentsResponse {
  @ApiProperty({
    type: [SimpleStudentResponse],
    description: 'All students',
  })
    students: SimpleStudentResponse[];

  @ApiProperty({
    type: PaginationDataResponse,
    description: 'Pagination parameters',
  })
    pagination: PaginationDataResponse;
}

export class FullStudentResponse extends BaseStudentResponse {
  @ApiProperty({
    type: UserResponse,
    description: 'User data',
  })
    user: UserResponse;

  @ApiProperty({
    type: FullGroupResponse,
    description: 'Group data',
  })
    group: FullGroupResponse;

  @ApiProperty({
    type: [RoleWithStudentResponse],
    description: 'Student\'s roles',
  })
    roles: RoleWithStudentResponse[];
}

export class OrdinaryStudentResponse extends BaseStudentResponse {
  @ApiProperty({
    description: 'Username string',
  })
    username: string;

  @ApiProperty({
    description: 'Email string',
  })
    email: string;

  @ApiProperty({
    description: 'Link to student\'s avatar image',
  })
    avatar: string;

  @ApiProperty({
    description: 'Student\'s telegram id',
  })
    telegramId: number;

  @ApiProperty({
    type: ExtendedGroupResponse,
    description: 'Group to which the student belongs',
  })
    group: ExtendedGroupResponse;
}

export class StudentsResponse {
  @ApiProperty({
    type: [OrdinaryStudentResponse],
    description: 'List of student\'s data',
  })
    students: OrdinaryStudentResponse[];
}
