import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DisciplineService } from '../services/DisciplineService';
import { CreateDisciplineDTO } from '../dtos/CreateDisciplineDTO';
import { GroupByDisciplineGuard } from '../../security/group-guard/GroupByDisciplineGuard';
import { Access } from 'src/v2/security/Access';

@Controller({
  version: '2',
  path: '/disciplines',
})
export class DisciplineController {
  constructor (
    private disciplineService: DisciplineService,
  ) {}

  @Access('groups.$groupId.disciplines.create', GroupByDisciplineGuard)
  @Post()
  create (@Body() body: CreateDisciplineDTO) {
    return this.disciplineService.create(body);
  }

  // @UseGuards(JwtGuard, GroupByDisciplineGuard)
  // @Post('/:disciplineId/selective')
  // makeSelective (
  //   @Param('disciplineId') disciplineId: string,
  //   @Request() req,
  // ) {
  //   return this.disciplineService.makeSelective(req.user, disciplineId);
  // }

  @Access('groups.$groupId.disciplines.teachers.get', GroupByDisciplineGuard)
  @Get('/:disciplineId/teachers')
  async getAllByDiscipline (
    @Param('disciplineId') disciplineId: string
  ) {
    const teachers = await this.disciplineService.getTeachers(disciplineId);
    return { teachers };
  }

}