import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './UserResponse';
import { ExtendedGroupResponse, GroupResponse } from './GroupResponse';
import { RoleWithStudentResponse } from './RoleWithStudentResponse';
import { State } from '@prisma/client';
import { GroupRoles } from '../dtos/QueryAllStudentDTO';

export class BaseStudentResponse {
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
}

export class SimpleStudentResponse extends BaseStudentResponse {
  @ApiProperty({
    description: 'Student\'s id',
  })
    id: string;

  @ApiProperty({
    description: 'Student\'s state',
    enum: State,
  })
    state: State;

  @ApiProperty({
    description: 'Student\'s group role',
    enum: GroupRoles,
  })
    role: string;

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
}

export class FullStudentResponse extends BaseStudentResponse {
  @ApiProperty({
    type: UserResponse,
    description: 'User data',
  })
    user: UserResponse;

  @ApiProperty({
    type: GroupResponse,
    description: 'Group data',
  })
    group: GroupResponse;

  @ApiProperty({
    type: [RoleWithStudentResponse],
    description: 'Student roles',
  })
    roles: RoleWithStudentResponse[];

  @ApiProperty({
    enum: State,
    description: 'Student\'s state',
  })
    state: State;
}

export class OrdinaryStudentResponse extends BaseStudentResponse {
  @ApiProperty({
    description: 'Id of a specific student\'s',
  })
    id: string;

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
  
  @ApiProperty({
    enum: State,
    description: 'State for the student',
  })
    state: State;
}

export class StudentsResponse {
  @ApiProperty({
    type: [OrdinaryStudentResponse],
    description: 'List of student\'s data',
  })
    students: OrdinaryStudentResponse[];
}