import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { DisciplineService } from './DisciplineService';
import { CreateDisciplineDTO } from './dto/CreateDisciplineDTO';
import { JwtGuard } from '../../security/JwtGuard';
import { GroupByDisciplineGuard } from '../../security/group-guard/GroupByDisciplineGuard';

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

  @UseGuards(JwtGuard, GroupByDisciplineGuard)
  @Get('/:disciplineId/teachers')
  async getAllByDiscipline(
    @Param('disciplineId') disciplineId: string
  ) {
    return this.disciplineService.getTeachers(disciplineId);
  }

}