import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DisciplineService } from '../services/DisciplineService';
import { CreateDisciplineDTO } from '../dtos/CreateDisciplineDTO';
import { GroupByDisciplineGuard } from '../../security/group-guard/GroupByDisciplineGuard';
import { Access } from 'src/v2/security/Access';
import { UserByIdPipe } from '../pipes/UserByIdPipe';
import { SelectiveDisciplinesPipe } from '../pipes/SelectiveDisciplinesPipe';
import { StudentPipe } from '../pipes/StudentPipe';
import { AttachSelectiveDisciplinesDTO } from '../dtos/AttachSelectiveDisciplinesDTO';
import { ApiBadRequestResponse, ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Disciplines')
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

  @Access('users.$userId.selectiveDisciplines')
  @ApiBearerAuth()
  @Post(':userId/selectiveDisciplines')
  @ApiOkResponse()
  @ApiBadRequestResponse({
    description: `Exceptions:\n
                  InvalidEntityIdException: User with such id is not found
                  InvalidEntityIdException: Discipline with such id is not found
                  NotSelectiveException: This discipline is not selective
                  AlreadySelectedException: You have already selected this disciplines
                  NotBelongToGroupException: Discipline does not belong to this group
                  ExcessiveSelectiveDisciplinesException: There are excessive selective disciplines in the request`,
  })
  @ApiForbiddenResponse({
    description: `Exceptions:\n
                  NotApprovedException: Student is not approved
                  NoPermissionException: You do not have permission to perform this action`,
  })
  async attachSelectiveDisciplines (
    @Param('userId', UserByIdPipe, StudentPipe) userId: string,
    @Body(SelectiveDisciplinesPipe) body: AttachSelectiveDisciplinesDTO,
  ) {
    return this.disciplineService.selectDisciplines(userId, body);
  }
}