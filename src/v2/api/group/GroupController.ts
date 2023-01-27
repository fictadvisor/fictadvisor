import {Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards} from '@nestjs/common';
import { GroupService } from './GroupService';
import { CreateDTO } from './dto/CreateDTO';
import { GetDTO } from '../teacher/dto/GetDTO';
import { GroupByIdPipe } from './GroupByIdPipe';
import { Group } from '@prisma/client';
import { JwtGuard } from '../../security/JwtGuard';
import { GroupByParamsGuard } from '../../security/group-guard/GroupByParamsGuard';
import { Permission } from 'src/v2/security/permission-guard/Permission';
import { PermissionGuard } from 'src/v2/security/permission-guard/PermissionGuard';
import { EmailDTO } from './dto/EmailDTO';
import {ApproveDTO} from "../user/dto/ApproveDTO";
import {RoleDTO} from "./dto/RoleDTO";

@Controller({
  version: '2',
  path: '/groups',
})
export class GroupController {
  constructor(
    private groupService: GroupService
  ) {}

  @Post()
  create(@Body() body: CreateDTO) {
    return this.groupService.create(body.code);
  }

  @Get()
  getAll(@Query() body: GetDTO<Group>) {
    return this.groupService.getAll(body);
  }

  @Get('/:groupId')
  get(
    @Param('groupId', GroupByIdPipe) group: Group
  ) {
    return group;
  }

  //@Permission('groups.disciplines.teachers.get')
  @UseGuards(JwtGuard, GroupByParamsGuard)
  @Get('/:groupId/disciplineTeachers')
  async getDisciplineTeachers(
    @Param('groupId') groupId: string,
  ) {
    return this.groupService.getDisciplineTeachers(groupId);
  }

  @UseGuards(JwtGuard, GroupByParamsGuard)
  @Get('/:groupId/disciplines')
  async getDiscipline(
    @Param('groupId') groupId: string,
  ) {
    const disciplines = await this.groupService.getDisciplines(groupId);
    return { disciplines };
  }

  @Permission('groups.$groupId.students.add')
  @UseGuards(JwtGuard, PermissionGuard)
  @Post('/:groupId/add-emails')
  async addUnregistered(
    @Param('groupId') groupId: string,
    @Body() body: EmailDTO
  ) {
    return await this.groupService.addUnregistered(groupId, body);
  }

  @Permission('groups.$groupId.students.verify')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:groupId/verify/:email')
  async verifyStudent(
      @Param('groupId') groupId: string,
      @Param('email') email: string,
      @Body() body : ApproveDTO
  ) {
    return await this.groupService.verifyStudent(groupId, email, body);
  }

  @Permission('groups.$groupId.admin.switch')
  @UseGuards(JwtGuard, PermissionGuard)
  @Patch('/:groupId/switch/:userId')
  async adminSwitch(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
    @Body() body: RoleDTO
  ) {
    return await this.groupService.adminSwitch(groupId, userId, body);
  }

  @Permission('groups.$groupId.students.remove')
  @UseGuards(JwtGuard, PermissionGuard)
  @Delete('/:groupId/remove/:userId')
  async removeStudent(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ){
    return await this.groupService.removeStudent(groupId, userId);
  }
}