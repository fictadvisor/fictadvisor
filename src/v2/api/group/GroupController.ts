import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import { GroupService } from './GroupService';
import {CreateGroupDTO} from './dto/CreateGroupDTO';
import { GroupByIdPipe } from './GroupByIdPipe';
import { Group } from '@prisma/client';
import { JwtGuard } from '../../security/JwtGuard';
import { Permission } from 'src/v2/security/permission-guard/Permission';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';
import { EmailDTO } from './dto/EmailDTO';
import {ApproveDTO} from "../user/dto/ApproveDTO";
import {RoleDTO} from "./dto/RoleDTO";
import {UserByIdPipe} from "../user/UserByIdPipe";
import {QueryAllDTO} from "../../utils/QueryAllDTO";
import {UpdateGroupDTO} from "./dto/UpdateGroupDTO";

@Controller({
  version: '2',
  path: '/groups',
})
export class GroupController {
  constructor(
    private groupService: GroupService
  ) {}

  @Permission('groups.create')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post()
  create(@Body() body: CreateGroupDTO) {
    return this.groupService.create(body.code);
  }

  @Get()
  async getAll(@Query() body: QueryAllDTO) {
    const groups = await this.groupService.getAll(body);
    return {
      groups,
    };
  }

  @Get('/:groupId')
  get(
    @Param('groupId', GroupByIdPipe) group: Group
  ) {
    return group;
  }

  @Permission('groups.update')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch()
  async update(
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: UpdateGroupDTO,
  ){
    return this.groupService.updateGroup(groupId, body);
  }

  @Permission('groups.delete')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:groupId')
  async deleteGroup(
    @Param('groupId', GroupByIdPipe) groupId: string,
  ){
    return this.groupService.deleteGroup(groupId);
  }

  @Permission('groups.$groupId.students.get')
  @UseGuards(JwtGuard, PermissionGuard)
  @Get('/:groupId/students')
  async getStudents(
    @Param('groupId', GroupByIdPipe) groupId: string,
  ){
    return this.groupService.getStudents(groupId);
  }
  @Permission('groups.$groupId.captain.get')
  @UseGuards(JwtGuard, PermissionGuard)
  @Get('/:groupId/captain')
  async getCaptain(
    @Param('groupId', GroupByIdPipe) groupId: string,
  ){
    return this.groupService.getCaptain(groupId);
  }

  @Permission('groups.$groupId.disciplines.teachers.get')
  @UseGuards(JwtGuard)
  @Get('/:groupId/disciplineTeachers')
  async getDisciplineTeachers(
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    return this.groupService.getDisciplineTeachers(groupId);
  }

  @Permission('groups.$groupId.disciplines.get')
  @UseGuards(JwtGuard)
  @Get('/:groupId/disciplines')
  async getDiscipline(
    @Param('groupId', GroupByIdPipe) groupId: string,
  ) {
    const disciplines = await this.groupService.getDisciplines(groupId);
    return { disciplines };
  }

  @Permission('groups.$groupId.students.add')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post('/:groupId/addEmails')
  async addUnregistered(
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Body() body: EmailDTO
  ) {
    return this.groupService.addUnregistered(groupId, body);
  }

  @Permission('groups.$groupId.students.verify')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:groupId/verify/:userId')
  async verifyStudent(
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body : ApproveDTO
  ) {
    return this.groupService.verifyStudent(groupId, userId, body);
  }

  @Permission('groups.$groupId.admin.switch')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:groupId/switch/:userId')
  async moderatorSwitch(
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
    @Body() body: RoleDTO
  ) {
    return this.groupService.moderatorSwitch(groupId, userId, body);
  }

  @Permission('groups.$groupId.students.remove')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:groupId/remove/:userId')
  async removeStudent(
    @Param('groupId', GroupByIdPipe) groupId: string,
    @Param('userId', UserByIdPipe) userId: string,
  ){
    return this.groupService.removeStudent(groupId, userId);
  }

}