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
import { StudentMapper } from '../../mappers/StudentMapper';
import { AbsenceOfCaptainException } from '../../utils/exceptions/AbsenceOfCaptainException';
import { GroupMapper } from '../../mappers/GroupMapper';
import { ApiTags, ApiBearerAuth, ApiForbiddenResponse, ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { GroupResponse, GroupsResponse } from '../responses/GroupResponse';

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
  @Access('groups.create')
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
    return { groups, meta: groupsWithSelectiveAmounts.meta };
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
  @Access('groups.update')
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
  @Access('groups.delete')
  @Delete('/:groupId')
  async deleteGroup (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    return this.groupService.deleteGroup(groupId);
  }

  @Access('groups.$groupId.students.get')
  @Get('/:groupId/students')
  async getStudents (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const students = await this.groupService.getStudents(groupId);

    return { students };
  }

  @Access('groups.$groupId.captain.get')
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

  @Access('groups.$groupId.disciplines.teachers.get')
  @Get('/:groupId/disciplineTeachers')
  async getDisciplineTeachers (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    return this.groupService.getDisciplineTeachers(groupId);
  }

  @Access('groups.$groupId.disciplines.get')
  @Get('/:groupId/disciplines')
  async getDiscipline (
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const disciplines = await this.groupService.getDisciplines(groupId);
    return { disciplines };
  }

  @Access('groups.$groupId.students.add')
  @Post('/:groupId/addEmails')
  async addUnregistered (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: EmailDTO
  ) {
    return this.groupService.addUnregistered(groupId, body);
  }

  @Access('groups.$groupId.students.verify')
  @Patch('/:groupId/verify/:userId')
  async verifyStudent (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body : ApproveDTO
  ) {
    const student = await this.groupService.verifyStudent(groupId, userId, body);
    return this.studentMapper.getStudent(student);
  }

  @Access('groups.$groupId.admin.switch')
  @Patch('/:groupId/switch/:userId')
  async moderatorSwitch (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: RoleDTO
  ) {
    return this.groupService.moderatorSwitch(groupId, userId, body);
  }

  @Access('groups.$groupId.students.remove')
  @Delete('/:groupId/remove/:userId')
  async removeStudent (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
    @Request() req,
  ) {
    return this.groupService.removeStudent(groupId, userId, req.user);
  }

  @Access('groups.$groupId.students.unverified.get')
  @Get('/:groupId/unverifiedStudents')
  async getUnverifiedStudents (
      @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const students = await this.groupService.getUnverifiedStudents(groupId);

    return { students };
  }

}