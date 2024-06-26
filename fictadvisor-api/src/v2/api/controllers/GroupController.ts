import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  CreateGroupDTO,
  EmailDTO,
  ApproveDTO,
  RoleDTO,
  UpdateGroupDTO,
  QuerySemesterDTO,
  SwitchCaptainDTO,
  GroupStudentsQueryDTO,
  QueryAllGroupsDTO,
  StudentOfGroupDTO,
} from '@fictadvisor/utils/requests';
import {
  GroupStudentsResponse,
  CaptainResponse,
  ExtendedDisciplineTeachersResponse,
  ShortUsersResponse,
  SelectiveDisciplinesWithAmountResponse,
  ShortDisciplinesResponse,
  OrdinaryStudentResponse,
  StudentsResponse,
  GroupsWithTelegramGroupsResponse,
  URLResponse,
  MappedGroupResponse,
  PaginatedGroupsResponse,
} from '@fictadvisor/utils/responses';
import { PERMISSION } from '@fictadvisor/utils/security';
import { SortQAGroupsParam } from '@fictadvisor/utils/enums';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { TelegramGuard } from '../../security/TelegramGuard';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { StudentOfGroupPipe } from '../pipes/StudentOfGroupPipe';
import { StudentMapper } from '../../mappers/StudentMapper';
import { GroupMapper } from '../../mappers/GroupMapper';
import { DisciplineMapper } from '../../mappers/DisciplineMapper';
import { GroupService } from '../services/GroupService';
import { UserService } from '../services/UserService';
import { AbsenceOfCaptainException } from '../../utils/exceptions/AbsenceOfCaptainException';

@ApiTags('Groups')
@Controller({
  version: '2',
  path: '/groups',
})
export class GroupController {
  constructor (
    private groupService: GroupService,
    private userService: UserService,
    private studentMapper: StudentMapper,
    private groupMapper: GroupMapper,
    private disciplineMapper: DisciplineMapper,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: MappedGroupResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Proper name is expected
      Code can not be empty
      Educational program id cannot be empty
      Cathedra id cannot be empty
      Admission year must be a number
      Admission year cannot be empty`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException: 
      You do not have permission to perform this action`,
  })
  @ApiEndpoint({
    summary: 'Create a new group',
    permissions: PERMISSION.GROUPS_CREATE,
  })
  @Post()
  async create (@Body() data: CreateGroupDTO): Promise<MappedGroupResponse> {
    const group = await this.groupService.create(data);
    return this.groupMapper.getGroup(group);
  }

  @ApiOkResponse({
    type: PaginatedGroupsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidBodyException: 
      Specialties must be an array
      Cathedras must be an array
      Courses must be an array
      Min course value is 1
      Max course value is 4
      Cathedras must be an array
      Wrong value for order
      Page must be a number
      PageSize must be a number`,
  })
  @ApiEndpoint({
    summary: 'Get all groups with selected filter',
  })
  @Get()
  async getAll (@Query() query: QueryAllGroupsDTO): Promise<PaginatedGroupsResponse> {
    const groupsWithSelectiveAmounts = await this.groupService.getAll(query);
    const groups = this.groupMapper.getGroups(
      groupsWithSelectiveAmounts.data, 
      query.sort === SortQAGroupsParam.CAPTAIN
    );
    return {
      groups,
      pagination: groupsWithSelectiveAmounts.pagination,
    };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: GroupsWithTelegramGroupsResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiEndpoint({
    summary: 'Get all groups with telegram groups',
    guards: TelegramGuard,
  })
  @Get('/telegramGroups')
  async getGroupsWithTelegramGroups () {
    const groups = await this.groupService.getGroupsWithTelegramGroups();
    return this.groupMapper.getGroupsWithTelegramGroups(groups);
  }

  @ApiOkResponse({
    type: MappedGroupResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group to get',
  })
  @ApiEndpoint({
    summary: 'Get group with selected id',
  })
  @Get('/:groupId')
  async get (
    @Param('groupId', GroupByIdPipe) groupId: string
  ): Promise<MappedGroupResponse> {
    const group = await this.groupService.get(groupId);
    return this.groupMapper.getGroup(group);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: MappedGroupResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found
        
    InvalidBodyException: 
      Proper name is expected
      Code can not be empty
      Admission year must be a number`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException: 
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group to update',
  })
  @ApiEndpoint({
    summary: 'Update group with selected id',
    permissions: PERMISSION.GROUPS_UPDATE,
  })
  @Patch('/:groupId')
  async update (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() data: UpdateGroupDTO,
  ): Promise<MappedGroupResponse> {
    const group = await this.groupService.updateGroup(groupId, data);
    return this.groupMapper.getGroup(group);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: MappedGroupResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException: 
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group to delete',
  })
  @ApiEndpoint({
    summary: 'Delete group by id',
    permissions: PERMISSION.GROUPS_DELETE,
  })
  @Delete('/:groupId')
  async deleteGroup (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ): Promise<MappedGroupResponse> {
    const group = await this.groupService.deleteGroup(groupId);
    return this.groupMapper.getGroup(group);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: GroupStudentsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found
    
    InvalidBodyException:
      Wrong value for sort
      Wrong value for order`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException: 
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of student\'s group',
  })
  @ApiEndpoint({
    summary: 'Get students by group id',
    permissions: PERMISSION.GROUPS_$GROUPID_STUDENTS_GET,
  })
  @Get('/:groupId/students')
  async getStudents (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query() query: GroupStudentsQueryDTO,
  ) {
    const students = await this.groupService.getStudents(groupId, query);
    return { students };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: CaptainResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException: 
      Group with such id is not found
      
    AbsenceOfCaptainException:
      Captain was not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException: 
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group to get the captain from',
  })
  @ApiEndpoint({
    summary: 'Get captain by group id',
    permissions: PERMISSION.GROUPS_$GROUPID_CAPTAIN_GET,
  })
  @Get('/:groupId/captain')
  async getCaptain (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const captain = await this.groupService.getCaptain(groupId);
    if (!captain) {
      throw new AbsenceOfCaptainException();
    }
    return captain;
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: [ExtendedDisciplineTeachersResponse],
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException:
      Group with such id is not found
      
    DataMissingException:
      Data are missing`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException: 
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group to get the discipline teachers from',
  })
  @ApiEndpoint({
    summary: 'Request teachers of disciplines by group\'s id',
    permissions: PERMISSION.GROUPS_$GROUPID_DISCIPLINES_TEACHERS_GET,
  })
  @Get('/:groupId/disciplineTeachers')
  async getDisciplineTeachers (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query() query?: QuerySemesterDTO,
  ) {
    return this.groupService.getDisciplineTeachers(groupId, query);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ShortDisciplinesResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException:
      Group with such id is not found
  
    DataMissingException:
      Data are missing`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException: 
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group to get the disciplines from',
  })
  @ApiEndpoint({
    summary: 'Request disciplines by group\'s id',
    permissions: PERMISSION.GROUPS_$GROUPID_DISCIPLINES_GET,
  })
  @Get('/:groupId/disciplines')
  async getDiscipline (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Query() query?: QuerySemesterDTO,
  ) {
    const disciplines = await this.groupService.getDisciplines(groupId, query);
    return { disciplines };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: ShortUsersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException: 
      Group with such id is not found
      
    InvalidBodyException: 
      Email cannot be empty
      The email is not a valid email address`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `
    NoPermissionException: 
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group to add emails of students',
  })
  @ApiEndpoint({
    summary: 'Add emails of students to group',
    permissions: PERMISSION.GROUPS_$GROUPID_STUDENTS_ADD,
  })
  @Post('/:groupId/addEmails')
  async addUnregistered (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: EmailDTO,
  ) {
    return this.groupService.addUnregistered(groupId, body);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: OrdinaryStudentResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found
      User with such id is not found
      
    InvalidBodyException:
      State is not an enum`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group to verify user from',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of the user to verify',
  })
  @ApiEndpoint({
    summary: 'Verify student state',
    permissions: PERMISSION.GROUPS_$GROUPID_STUDENTS_VERIFY,
  })
  @Patch('/:groupId/verify/:userId')
  async verifyStudent (
    @Param(StudentOfGroupPipe) { userId, groupId }: StudentOfGroupDTO,
    @Body() body : ApproveDTO,
  ) {
    const student = await this.groupService.verifyStudent(groupId, userId, body);
    return this.studentMapper.getStudent(student);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found
      User with such id is not found
      
    InvalidBodyException:
      Role name can not be empty`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group to switch user role from',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of the user to switch role',
  })
  @ApiEndpoint({
    summary: 'Switch user role',
    permissions: PERMISSION.GROUPS_$GROUPID_ADMIN_SWITCH,
  })
  @Patch('/:groupId/switch/:userId')
  async switchRole (
    @Param(StudentOfGroupPipe) { userId }: StudentOfGroupDTO,
    @Body() { roleName }: RoleDTO,
  ) {
    return this.userService.changeGroupRole(userId, roleName);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found
      User with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of a group',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'Id of a user to remove',
  })
  @ApiEndpoint({
    summary: 'Remove a student from a group',
    permissions: PERMISSION.GROUPS_$GROUPID_STUDENTS_REMOVE,
  })
  @Delete('/:groupId/remove/:userId')
  async removeStudent (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
    @Request() req,
  ) {
    return this.groupService.removeStudent(groupId, userId, req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: StudentsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of a group',
  })
  @ApiEndpoint({
    summary: 'Get unverified students of the group',
    permissions: PERMISSION.GROUPS_$GROUPID_STUDENTS_UNVERIFIED_GET,
  })
  @Get('/:groupId/unverifiedStudents')
  async getUnverifiedStudents (
      @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const students = await this.groupService.getUnverifiedStudents(groupId);
    return { students };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: OrdinaryStudentResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      User with such id is not found
      Group with such id is not found
      
    StudentIsAlreadyCaptainException:
      The student is already the captain of the group`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of a group',
  })
  @ApiEndpoint({
    summary: 'Make a student a captain',
    permissions: [PERMISSION.GROUPS_CAPTAIN_SWITCH, PERMISSION.GROUPS_$GROUPID_TRANSFER],
  })
  @Post('/:groupId/switchCaptain')
  async switchCaptain (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() { studentId }: SwitchCaptainDTO,
  ) {
    return this.groupService.switchCaptain(groupId, studentId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: URLResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException: 
      Group with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of a group',
  })
  @ApiEndpoint({
    summary: 'Get a group\'s list',
    permissions: PERMISSION.GROUPS_$GROUPID_LIST_GET,
  })
  @Get('/:groupId/list')
  async getGroupList (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const url = await this.groupService.getGroupList(groupId);
    return { url };
  }

  @ApiBearerAuth()
  @Patch('/:groupId/leave')
  @ApiOkResponse({
    type: OrdinaryStudentResponse,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action
      
    NotApprovedException:
      Student is not approved`,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidEntityIdException:
      Group with such id is not found`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of a group to leave',
  })
  @ApiEndpoint({
    summary: 'Leave user from the group',
    permissions: PERMISSION.GROUPS_$GROUPID_LEAVE,
  })
  async leaveGroup (
      @Param('groupId', GroupByIdPipe) groupId: string,
      @Request() req,
  ) {
    return this.groupService.leaveGroup(groupId, req.user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: [SelectiveDisciplinesWithAmountResponse],
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException:
      Group with such id is not found
  
    DataMissingException:
      Data are missing`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException: 
      You do not have permission to perform this action`,
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: 'Id of the group to get the selective disciplines from',
  })
  @ApiEndpoint({
    summary: 'Request selective disciplines by group\'s id',
    permissions: PERMISSION.GROUPS_$GROUPID_SELECTIVE_GET,
  })
  @Get('/:groupId/selectiveDisciplines')
  async getSelectives (
      @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const disciplines = await this.groupService.getSelectiveDisciplines(groupId);
    return this.disciplineMapper.getSelectiveDisciplines(disciplines, true);
  }
}
