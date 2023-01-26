import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards} from '@nestjs/common';
import { GroupService } from './GroupService';
import { CreateDTO } from './dto/CreateDTO';
import { GroupByIdPipe } from './GroupByIdPipe';
import { Group } from '@prisma/client';
import { JwtGuard } from '../../security/JwtGuard';
import { GroupByParamsGuard } from '../../security/group-guard/GroupByParamsGuard';
import {QueryAllDTO} from "../../utils/QueryAllDTO";

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

  @UseGuards(JwtGuard, GroupByParamsGuard)
  @Get('/:groupId/captain')
  async getCaptain(
      @Param('groupId') groupId: string,
  ){
    return this.groupService.getCaptain(groupId);
  }

  @UseGuards(JwtGuard, GroupByParamsGuard)
  @Delete('/:groupId')
  async deleteGroup(
      @Param('groupId') groupId: string,
  ){
    return this.groupService.deleteGroup(groupId);
  }

  @UseGuards(JwtGuard, GroupByParamsGuard)
  @Get()
  async getStudents(
      @Param('groupId') groupId: string,
  ){
    return this.groupService.getStudents(groupId);
  }
}