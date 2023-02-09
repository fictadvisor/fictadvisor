import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { DisciplineService } from './DisciplineService';
import { CreateDisciplineDTO } from './dto/CreateDisciplineDTO';
import { JwtGuard } from '../../security/JwtGuard';
import { GroupByDisciplineGuard } from '../../security/group-guard/GroupByDisciplineGuard';
import { PermissionGuard } from "../../security/permission-guard/PermissionGuard";
import { Permission } from "../../security/permission-guard/Permission";

@Controller({
  version: '2',
  path: '/disciplines',
})
export class DisciplineController {
  constructor(
    private disciplineService: DisciplineService,
  ) {}

  @Post()
  create(@Body() body: CreateDisciplineDTO) {
    return this.disciplineService.create(body);
  }

  @UseGuards(JwtGuard, GroupByDisciplineGuard)
  @Post('/:disciplineId/selective')
  makeSelective(
    @Param('disciplineId') disciplineId: string,
    @Request() req,
  ) {
    return this.disciplineService.makeSelective(req.user, disciplineId);
  }

  @Permission('groups.$groupId.disciplines.teachers.get')
  @UseGuards(JwtGuard, GroupByDisciplineGuard, PermissionGuard)
  @Get('/:disciplineId/teachers')
  async getAllByDiscipline(
    @Param('disciplineId') disciplineId: string
  ) {
    return this.disciplineService.getTeachers(disciplineId);
  }

}