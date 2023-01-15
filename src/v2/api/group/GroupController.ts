import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { GroupService } from './GroupService';
import { CreateDTO } from './dto/CreateDTO';
import { GetDTO } from '../teacher/dto/GetDTO';
import { GroupByIdPipe } from './GroupByIdPipe';
import { Group } from '@prisma/client';
import { JwtGuard } from '../../security/JwtGuard';
import { GroupByParamsGuard } from '../../security/group-guard/GroupByParamsGuard';

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
  get(@Param('groupId', GroupByIdPipe) group: Group) {
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

}