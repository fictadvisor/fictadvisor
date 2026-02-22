import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  ApproveDTO,
  CreateGroupDTO,
  EmailDTO,
  ExtendedDisciplinesTeachersResponse,
  GroupStudentsQueryDTO,
  GroupStudentsResponse,
  GroupsWithTelegramGroupsResponse,
  MappedGroupResponse,
  OrdinaryStudentResponse,
  PaginatedGroupsResponse,
  PERMISSION,
  QueryAllGroupsDTO,
  QuerySemesterDTO,
  RoleDTO,
  SelectiveDisciplinesWithAmountResponse,
  ShortDisciplineResponse,
  ShortDisciplinesResponse,
  ShortUsersResponse,
  StudentOfGroupDTO,
  StudentsResponse,
  SwitchCaptainDTO,
  UpdateGroupDTO,
  URLResponse,
  UserResponse,
} from '@fictadvisor/utils';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { GetUser } from '../../../common/decorators/get-user.decorator';
import { TelegramGuard } from '../../../common/guards/telegram/telegram.guard';
import { GroupByIdPipe } from '../../../common/pipes/group-by-id.pipe';
import { UserByIdPipe } from '../../../common/pipes/user-by-id.pipe';
import { CreateGroupPipe } from '../../../common/pipes/create-group.pipe';
import { StudentOfGroupPipe } from '../../../common/pipes/student-of-group.pipe';
import { GroupService } from './group.service';
import { UserService } from '../../user/v2/user.service';
import { GroupDocumentation } from '../../../common/documentation/modules/v2/group';
import { UpdateGroupPipe } from '../../../common/pipes/update-group.pipe';
import { User } from '@prisma-client/fictadvisor';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbGroup } from '../../../database/v2/entities/group.entity';
import {
  ExtendedDisciplineTeachersResponse,
  GroupWithTelegramGroupsResponse,
  ShortUserResponse,
} from '@fictadvisor/utils/responses';
import { DbUser } from '../../../database/v2/entities/user.entity';
import { DbDiscipline } from '../../../database/v2/entities/discipline.entity';
import { DbStudent } from '../../../database/v2/entities/student.entity';

@ApiTags('Groups')
@Controller({
  version: '2',
  path: '/groups',
})
export class GroupController {
  constructor (
    private groupService: GroupService,
    private userService: UserService,
    @InjectMapper() private mapper: Mapper,
  ) {}

  @ApiEndpoint({
    summary: 'Create a new group',
    permissions: PERMISSION.GROUPS_CREATE,
    documentation: GroupDocumentation.CREATE,
  })
  @Post()
  async create (
    @Body(CreateGroupPipe) data: CreateGroupDTO,
  ): Promise<MappedGroupResponse> {
    const group = await this.groupService.create(data);
    return this.mapper.map(group, DbGroup, MappedGroupResponse);
  }

  @ApiEndpoint({
    summary: 'Get all groups with selected filter',
    documentation: GroupDocumentation.GET_ALL,
  })
  @Get()
  async getAll (
    @Query() query: QueryAllGroupsDTO,
  ): Promise<PaginatedGroupsResponse> {
    const groupsWithSelectiveAmounts = await this.groupService.getAll(query);
    const groups = this.mapper.mapArray(groupsWithSelectiveAmounts.data, DbGroup, MappedGroupResponse);

    return {
      groups,
      pagination: groupsWithSelectiveAmounts.pagination,
    };
  }

  @ApiEndpoint({
    summary: 'Get all groups with telegram groups',
    guards: TelegramGuard,
    documentation: GroupDocumentation.GET_GROUPS_WITH_TELEGRAM_GROUPS,
  })
  @Get('/telegramGroups')
  async getGroupsWithTelegramGroups (): Promise<GroupsWithTelegramGroupsResponse> {
    const groups = await this.groupService.getGroupsWithTelegramGroups();
    const mappedGroups = this.mapper.mapArray(groups, DbGroup, GroupWithTelegramGroupsResponse);

    return { groups: mappedGroups };
  }

  @ApiEndpoint({
    summary: 'Get group with selected id',
    documentation: GroupDocumentation.GET,
  })
  @Get('/:groupId')
  async get (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ): Promise<MappedGroupResponse> {
    const group = await this.groupService.get(groupId);
    return this.mapper.map(group, DbGroup, MappedGroupResponse);
  }

  @ApiEndpoint({
    summary: 'Update group with selected id',
    permissions: PERMISSION.GROUPS_UPDATE,
    documentation: GroupDocumentation.UPDATE,
  })
  @Patch('/:groupId')
  async update (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body(UpdateGroupPipe) data: UpdateGroupDTO,
  ): Promise<MappedGroupResponse> {
    const group = await this.groupService.updateGroup(groupId, data);
    return this.mapper.map(group, DbGroup, MappedGroupResponse);
  }

  @ApiEndpoint({
    summary: 'Delete group by id',
    permissions: PERMISSION.GROUPS_DELETE,
    documentation: GroupDocumentation.DELETE,
  })
  @Delete('/:groupId')
  async deleteGroup (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ): Promise<MappedGroupResponse> {
    const group = await this.groupService.deleteGroup(groupId);
    return this.mapper.map(group, DbGroup, MappedGroupResponse);
  }

  @ApiEndpoint({
    summary: 'Get students by group id',
    permissions: PERMISSION.GROUPS_$GROUPID_STUDENTS_GET,
    documentation: GroupDocumentation.GET_STUDENTS,
  })
  @Get('/:groupId/students')
  async getStudents (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query() query: GroupStudentsQueryDTO,
  ): Promise<GroupStudentsResponse> {
    const students = await this.groupService.getStudents(groupId, query);
    return {
      students: this.mapper.mapArray(students, DbStudent, OrdinaryStudentResponse),
    };
  }

  @ApiEndpoint({
    summary: 'Get captain by group id',
    permissions: PERMISSION.GROUPS_$GROUPID_CAPTAIN_GET,
    documentation: GroupDocumentation.GET_CAPTAIN,
  })
  @Get('/:groupId/captain')
  async getCaptain (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ): Promise<UserResponse> {
    const captain = await this.groupService.getCaptain(groupId);
    return this.mapper.map(captain, DbUser, UserResponse);
  }

  @ApiEndpoint({
    summary: 'Request teachers of disciplines by group\'s id',
    permissions: PERMISSION.GROUPS_$GROUPID_DISCIPLINES_TEACHERS_GET,
    documentation: GroupDocumentation.GET_DISCIPLINE_TEACHER,
  })
  @Get('/:groupId/disciplineTeachers')
  async getDisciplineTeachers (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query() query?: QuerySemesterDTO,
  ): Promise<ExtendedDisciplinesTeachersResponse> {
    const disciplines = await this.groupService.getDisciplineTeachers(groupId, query);
    return {
      disciplines: this.mapper.mapArray(disciplines, DbDiscipline, ExtendedDisciplineTeachersResponse),
    };
  }

  @ApiEndpoint({
    summary: 'Request disciplines by group\'s id',
    permissions: PERMISSION.GROUPS_$GROUPID_DISCIPLINES_GET,
    documentation: GroupDocumentation.GET_DISCIPLINES,
  })
  @Get('/:groupId/disciplines')
  async getDisciplines (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query() query?: QuerySemesterDTO,
  ): Promise<ShortDisciplinesResponse> {
    const disciplines = await this.groupService.getDisciplineTeachers(groupId, query);
    return {
      disciplines: this.mapper.mapArray(disciplines, DbDiscipline, ShortDisciplineResponse),
    };
  }

  @ApiEndpoint({
    summary: 'Add emails of students to group',
    permissions: PERMISSION.GROUPS_$GROUPID_STUDENTS_ADD,
    documentation: GroupDocumentation.ADD_EMAILS,
  })
  @Post('/:groupId/addEmails')
  async addUnregistered (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: EmailDTO,
  ): Promise<ShortUsersResponse> {
    const users = await this.groupService.addUnregistered(groupId, body);
    const mappedUsers = this.mapper.mapArray(users, DbUser, ShortUserResponse);

    return { users: mappedUsers };
  }

  @ApiEndpoint({
    summary: 'Verify student state',
    permissions: PERMISSION.GROUPS_$GROUPID_STUDENTS_VERIFY,
    documentation: GroupDocumentation.VERIFY_STUDENT,
  })
  @Patch('/:groupId/verify/:userId')
  async verifyStudent (
    @Param(StudentOfGroupPipe) { userId, groupId }: StudentOfGroupDTO,
    @Body() body: ApproveDTO,
  ): Promise<OrdinaryStudentResponse> {
    const student = await this.groupService.verifyStudent(groupId, userId, body);
    return this.mapper.map(student, DbStudent, OrdinaryStudentResponse);
  }

  @ApiEndpoint({
    summary: 'Switch user role',
    permissions: PERMISSION.GROUPS_$GROUPID_ADMIN_SWITCH,
    documentation: GroupDocumentation.SWITCH_ROLE,
  })
  @Patch('/:groupId/switch/:userId')
  async switchRole (
    @Param(StudentOfGroupPipe) { userId }: StudentOfGroupDTO,
    @Body() { roleName }: RoleDTO,
  ): Promise<void> {
    return this.userService.changeGroupRole(userId, roleName);
  }

  @ApiEndpoint({
    summary: 'Remove a student from a group',
    permissions: PERMISSION.GROUPS_$GROUPID_STUDENTS_REMOVE,
    documentation: GroupDocumentation.REMOVE_STUDENT,
  })
  @Delete('/:groupId/remove/:userId')
  async removeStudent (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
    @GetUser() user: User,
  ):Promise<void> {
    return this.groupService.removeStudent(groupId, userId, user);
  }

  @ApiEndpoint({
    summary: 'Get unverified students of the group',
    permissions: PERMISSION.GROUPS_$GROUPID_STUDENTS_UNVERIFIED_GET,
    documentation: GroupDocumentation.GET_UNVERIFIED_STUDENTS,
  })
  @Get('/:groupId/unverifiedStudents')
  async getUnverifiedStudents (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ): Promise<StudentsResponse> {
    const students = await this.groupService.getUnverifiedStudents(groupId);
    return {
      students: this.mapper.mapArray(students, DbStudent, OrdinaryStudentResponse),
    };
  }

  @ApiEndpoint({
    summary: 'Make a student a captain',
    permissions: [PERMISSION.GROUPS_CAPTAIN_SWITCH, PERMISSION.GROUPS_$GROUPID_TRANSFER],
    documentation: GroupDocumentation.SWITCH_CAPTAIN,
  })
  @Post('/:groupId/switchCaptain')
  async switchCaptain (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() { studentId }: SwitchCaptainDTO,
  ): Promise<OrdinaryStudentResponse> {
    return this.groupService.switchCaptain(groupId, studentId);
  }

  @ApiEndpoint({
    summary: 'Get a group\'s list',
    permissions: PERMISSION.GROUPS_$GROUPID_LIST_GET,
    documentation: GroupDocumentation.GET_GROUP_LIST,
  })
  @Get('/:groupId/list')
  async getGroupList (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ): Promise<URLResponse> {
    const url = await this.groupService.getGroupList(groupId);
    return { url };
  }

  @ApiEndpoint({
    summary: 'Leave user from the group',
    permissions: PERMISSION.GROUPS_$GROUPID_LEAVE,
    documentation: GroupDocumentation.LEAVE_GROUP,
  })
  @Patch('/:groupId/leave')
  async leaveGroup (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @GetUser('id') userId: string,
  ): Promise<OrdinaryStudentResponse> {
    const student = await this.groupService.leaveGroup(groupId, userId);
    return this.mapper.map(student, DbStudent, OrdinaryStudentResponse);
  }

  @ApiEndpoint({
    summary: 'Request selective disciplines by group\'s id',
    permissions: PERMISSION.GROUPS_$GROUPID_SELECTIVE_GET,
    documentation: GroupDocumentation.GET_SELECTIVES,
  })
  @Get('/:groupId/selectiveDisciplines')
  async getSelectives (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ): Promise<SelectiveDisciplinesWithAmountResponse[]> {
    const disciplines = await this.groupService.getSelectiveDisciplines(groupId);
    return this.groupService.getMappedSelectiveDisciplines(disciplines);
  }
}
