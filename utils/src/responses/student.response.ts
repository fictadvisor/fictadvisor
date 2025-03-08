import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user.response';
import { ExtendedGroupResponse, GroupResponse, FullGroupResponse } from './group.response';
import { RoleWithStudentResponse } from './role-with-student.response';
import { State, GroupRoles } from '../enums';
import { PaginationDataResponse } from './pagination-data.response';
import { AutoMap } from '@automapper/classes';

export class BaseStudentResponse {
  @ApiProperty({
    description: 'Student\'s id',
  })
  @AutoMap()
    id: string;

  @ApiProperty({
    description: 'Student\'s firstName',
  })
  @AutoMap()
    firstName: string;

  @ApiProperty({
    description: 'Student\'s middleName',
  })
  @AutoMap()
    middleName: string;

  @ApiProperty({
    description: 'Student\'s lastName',
  })
  @AutoMap()
    lastName: string;

  @ApiProperty({
    description: 'Student\'s state',
    enum: State,
  })
  @AutoMap(() => String)
    state: State;
}

export class SimpleStudentResponse extends BaseStudentResponse {
  @ApiProperty({
    description: 'Student\'s group role',
    enum: GroupRoles,
  })
  @AutoMap(() => String)
    role: keyof typeof GroupRoles;

  @ApiProperty({
    type: GroupResponse,
    description: 'Student\'s group',
  })
  @AutoMap(() => GroupResponse)
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
  @AutoMap(() => UserResponse)
    user: UserResponse;

  @ApiProperty({
    type: FullGroupResponse,
    description: 'Group data',
  })
  @AutoMap(() => FullGroupResponse)
    group: FullGroupResponse;

  @ApiProperty({
    type: [RoleWithStudentResponse],
    description: 'Student\'s roles',
  })
  @AutoMap(() => [RoleWithStudentResponse])
    roles: RoleWithStudentResponse[];
}

export class OrdinaryStudentResponse extends BaseStudentResponse {
  @ApiProperty({
    description: 'Username string',
  })
  @AutoMap()
    username: string;

  @ApiProperty({
    description: 'Email string',
  })
  @AutoMap()
    email: string;

  @ApiProperty({
    description: 'Link to student\'s avatar image',
  })
  @AutoMap()
    avatar: string;

  @ApiProperty({
    description: 'Student\'s telegram id',
  })
  @AutoMap()
    telegramId: number;

  @ApiProperty({
    type: ExtendedGroupResponse,
    description: 'Group to which the student belongs',
  })
  @AutoMap(() => ExtendedGroupResponse)
    group: ExtendedGroupResponse;
}

export class StudentsResponse {
  @ApiProperty({
    type: [OrdinaryStudentResponse],
    description: 'List of student\'s data',
  })
    students: OrdinaryStudentResponse[];
}
