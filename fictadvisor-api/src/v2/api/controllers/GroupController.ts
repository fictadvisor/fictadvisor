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
  ShortDisciplinesResponse,
  ShortUsersResponse,
  SortQAGroupsParam,
  StudentOfGroupDTO,
  StudentsResponse,
  SwitchCaptainDTO,
  UpdateGroupDTO,
  URLResponse,
  UserResponse,
} from '@fictadvisor/utils';
import { ApiEndpoint, GetUser } from '../../utils/documentation/decorators';
import { TelegramGuard } from '../../security/TelegramGuard';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { CreateGroupPipe } from '../pipes/CreateGroupPipe';
import { StudentOfGroupPipe } from '../pipes/StudentOfGroupPipe';
import { StudentMapper } from '../../mappers/StudentMapper';
import { GroupMapper } from '../../mappers/GroupMapper';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { UserMapper } from '../../mappers/UserMapper';
import { GroupService } from '../services/GroupService';
import { UserService } from '../services/UserService';
import { GroupDocumentation } from '../../utils/documentation/group';
import { UpdateGroupPipe } from '../pipes/UpdateGroupPipe';
import { User } from '@prisma/client';

@ApiTags('Groups')
@Controller({
  version: '2',
  path: '/groups',
})
export class GroupController {
  constructor (
    private groupService: GroupService,
    private userService: UserService,
    private groupMapper: GroupMapper,
    private studentMapper: StudentMapper,
    private disciplineMapper: DisciplineMapper,
    private userMapper: UserMapper,
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
    return this.groupMapper.getMappedGroup(group);
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
    const groups = this.groupMapper.getMappedGroups(
      groupsWithSelectiveAmounts.data,
      query.sort === SortQAGroupsParam.CAPTAIN,
    );
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
    return this.groupMapper.getGroupsWithTelegramGroups(groups);
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
    return this.groupMapper.getMappedGroup(group);
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
    return this.groupMapper.getMappedGroup(group);
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
    return this.groupMapper.getMappedGroup(group);
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
      students: this.studentMapper.getOrdinaryStudents(students),
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
    return this.userMapper.getUser(captain);
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
      disciplines: this.disciplineMapper.getExtendedDisciplinesTeachers(disciplines),
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
      disciplines: this.disciplineMapper.getShortDisciplines(disciplines),
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
    return this.userMapper.getShortUsers(users);
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
    return this.studentMapper.getOrdinaryStudent(student);
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
      students: this.studentMapper.getOrdinaryStudents(students, false),
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
    return this.studentMapper.getOrdinaryStudent(student);
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
    return this.disciplineMapper.getSelectiveDisciplines(disciplines, true) as SelectiveDisciplinesWithAmountResponse[];
  }
}
