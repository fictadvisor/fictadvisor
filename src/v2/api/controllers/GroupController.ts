import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { GroupService } from '../services/GroupService';
import { CreateGroupDTO } from '../dtos/CreateGroupDTO';
import { GroupByIdPipe } from '../pipes/GroupByIdPipe';
import { EmailDTO } from '../dtos/EmailDTO';
import { ApproveDTO } from '../dtos/ApproveDTO';
import { RoleDTO } from '../dtos/RoleDTO';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { QueryAllDTO } from '../../utils/QueryAllDTO';
import { UpdateGroupDTO } from '../dtos/UpdateGroupDTO';
import { Access } from 'src/v2/security/Access';
import { PERMISSION } from '../../security/PERMISSION';
import { StudentMapper } from '../../mappers/StudentMapper';
import { AbsenceOfCaptainException } from '../../utils/exceptions/AbsenceOfCaptainException';
import { GroupMapper } from '../../mappers/GroupMapper';
import {
  ApiTags,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GroupResponse, GroupsResponse } from '../responses/GroupResponse';
import { GroupStudentsResponse } from '../responses/GroupStudentsResponse';
import { CaptainResponse } from '../responses/CaptainResponse';
import { ExtendDisciplineTeachersResponse } from '../responses/DisciplineTeachersResponse';
import { ShortUsersResponse } from '../responses/UserResponse';
import { QuerySemesterDTO } from '../dtos/QuerySemesterDTO';
import { ShortDisciplinesResponse } from '../responses/DisciplineResponse';
import { OrdinaryStudentResponse, StudentsResponse } from '../responses/StudentResponse';

@ApiTags('Groups')
@Controller({
  version: '2',
  path: '/groups',
})
export class GroupController {
  constructor (
    private groupService: GroupService,
    private studentMapper: StudentMapper,
    private groupMapper: GroupMapper,
  ) {}

  @ApiBearerAuth()
  @ApiOkResponse({
    type: GroupResponse,
  })
  @ApiBadRequestResponse({
    description: `
      InvalidBodyException: Proper name is expected
      InvalidBodyException: Code can not be empty
    `,
  })
  @ApiForbiddenResponse({
    description: `
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @Access(PERMISSION.GROUPS_CREATE)
  @Post()
  async create (@Body() body: CreateGroupDTO) {
    const group = await this.groupService.create(body.code);
    return this.groupMapper.getGroup(group);
  }

  @ApiOkResponse({
    type: GroupsResponse,
  })
  @ApiBadRequestResponse({
    description: `
      InvalidBodyException: Page must be a number
      InvalidBodyException: PageSize must be a number
      InvalidBodyException: Wrong value for order
    `,
  })
  @Get()
  async getAll (@Query() body: QueryAllDTO) {
    const groupsWithSelectiveAmounts = await this.groupService.getAll(body);
    const groups = this.groupMapper.getGroups(groupsWithSelectiveAmounts.data);
    return {
      groups,
      pagination: groupsWithSelectiveAmounts.pagination,
    };
  }

  @ApiOkResponse({
    type: GroupResponse,
  })
  @ApiBadRequestResponse({
    description: `
      InvalidEntityIdException: Group with such id is not found
    `,
  })
  @Get('/:groupId')
  async get (
    @Param('groupId', GroupByIdPipe) groupId: string
  ) {
    const group = await this.groupService.get(groupId);
    return this.groupMapper.getGroup(group);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: GroupResponse,
  })
  @ApiBadRequestResponse({
    description: `
      InvalidEntityIdException: Group with such id is not found
      InvalidBodyException: Proper name is expected
      InvalidBodyException: Code can not be empty
    `,
  })
  @ApiForbiddenResponse({
    description: `
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @Access(PERMISSION.GROUPS_UPDATE)
  @Patch('/:groupId')
  async update (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: UpdateGroupDTO,
  ) {
    const group = await this.groupService.updateGroup(groupId, body);
    return this.groupMapper.getGroup(group);
  }

  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `
      InvalidEntityIdException: Group with such id is not found
    `,
  })
  @ApiForbiddenResponse({
    description: `
      NoPermissionException: You do not have permission to perform this action
    `,
  })
  @Access(PERMISSION.GROUPS_DELETE)
  @Delete('/:groupId')
  async deleteGroup (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    return this.groupService.deleteGroup(groupId);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: GroupStudentsResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException: 
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
  @Access(PERMISSION.GROUPS_$GROUPID_STUDENTS_GET)
  @Get('/:groupId/students')
  async getStudents (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const students = await this.groupService.getStudents(groupId);

    return { students };
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: CaptainResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException: 
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
  @Access(PERMISSION.GROUPS_$GROUPID_CAPTAIN_GET)
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
    type: [ExtendDisciplineTeachersResponse],
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidGroupIdException: 
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
  @Access(PERMISSION.GROUPS_$GROUPID_DISCIPLINES_TEACHERS_GET)
  @Get('/:groupId/disciplineTeachers')
  async getDisciplineTeachers (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    return this.groupService.getDisciplineTeachers(groupId);
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
      Data are missing
      
    DataNotFoundException:
      Data were not found
    `,
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
  @Access(PERMISSION.GROUPS_$GROUPID_DISCIPLINES_GET)
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
  @Access(PERMISSION.GROUPS_$GROUPID_STUDENTS_ADD)
  @Post('/:groupId/addEmails')
  async addUnregistered (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: EmailDTO
  ) {
    return this.groupService.addUnregistered(groupId, body);
  }

  @Access(PERMISSION.GROUPS_$GROUPID_STUDENTS_VERIFY)
  @ApiBearerAuth()
  @Patch('/:groupId/verify/:userId')
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
  async verifyStudent (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body : ApproveDTO
  ) {
    const student = await this.groupService.verifyStudent(groupId, userId, body);
    return this.studentMapper.getStudent(student);
  }

  @Access(PERMISSION.GROUPS_$GROUPID_ADMIN_SWITCH)
  @ApiBearerAuth()
  @Patch('/:groupId/switch/:userId')
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
  async moderatorSwitch (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: RoleDTO
  ) {
    return this.groupService.moderatorSwitch(groupId, userId, body);
  }

  @Access(PERMISSION.GROUPS_$GROUPID_STUDENTS_REMOVE)
  @ApiBearerAuth()
  @Delete('/:groupId/remove/:userId')
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
  async removeStudent (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
    @Request() req,
  ) {
    return this.groupService.removeStudent(groupId, userId, req.user);
  }

  @Access(PERMISSION.GROUPS_$GROUPID_STUDENTS_UNVERIFIED_GET)
  @ApiBearerAuth()
  @Get('/:groupId/unverifiedStudents')
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
  async getUnverifiedStudents (
      @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const students = await this.groupService.getUnverifiedStudents(groupId);

    return { students };
  }

}