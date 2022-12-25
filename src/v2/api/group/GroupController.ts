import { Body, Controller, Post } from '@nestjs/common';
import { GroupService } from './GroupService';
import { CreateDTO } from './dto/CreateDTO';


@Controller({
  version: '2',
  path: '/group'
})
export class GroupController {
  constructor(
    private groupService: GroupService
  ) {}

  @Post()
  create(@Body() body: CreateDTO) {
    return this.groupService.create(body.code);
  }
}