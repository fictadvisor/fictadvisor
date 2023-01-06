import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupService } from './GroupService';
import { CreateDTO } from './dto/CreateDTO';
import { GetDTO } from '../teacher/dto/GetDTO';
import { GroupByIdPipe } from './GroupByIdPipe';
import { Group } from '@prisma/client';

@Controller({
  version: '2',
  path: '/groups'
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
  getAll(@Body() body: GetDTO) {
    return this.groupService.getAll(body);
  }

  @Get('/:id')
  get(@Param('id', GroupByIdPipe) group: Group) {
    return group;
  }

}