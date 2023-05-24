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

@Controller({
  version: '2',
  path: '/groups',
})
export class GroupController {
  constructor (
    private groupService: GroupService,
    private studentMapper: StudentMapper,
  ) {}

  @Access('groups.create')
  @Post()
  create (@Body() body: CreateGroupDTO) {
    return this.groupService.create(body.code);
  }

  @Get()
  async getAll (@Query() body: QueryAllDTO) {
    const groups = await this.groupService.getAll(body);
    return {
      groups,
    };
  }

  @Get('/:groupId')
  get (
    @Param('groupId', GroupByIdPipe) groupId: string
  ) {
    return this.groupService.get(groupId);
  }

  @Access('groups.update')
  @Patch('/:groupId')
  async update (
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: UpdateGroupDTO,
  ) {
    return this.groupService.updateGroup(groupId, body);
  }

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