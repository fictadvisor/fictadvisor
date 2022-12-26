import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupService } from './GroupService';
import { CreateDTO } from './dto/CreateDTO';
import { GetDTO } from '../teacher/dto/GetDTO';

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
  get(@Param('id') id: string) {
    return this.groupService.get(id);
  }

}