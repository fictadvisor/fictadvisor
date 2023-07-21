import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { DisciplineService } from '../services/DisciplineService';
import { CreateDisciplineDTO } from '../dtos/CreateDisciplineDTO';
import { GroupByDisciplineGuard } from '../../security/group-guard/GroupByDisciplineGuard';
import { Access } from 'src/v2/security/Access';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DisciplineByIdPipe } from '../pipes/DisciplineByIdPipe';
import { DisciplineTeachersResponse } from '../responses/DisciplineTeachersResponse';
import { DisciplineTypeEnum } from '@prisma/client';

@ApiTags('Discipline')
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
  @ApiBearerAuth()
  @ApiQuery({
    name: 'disciplineType',
    enum: DisciplineTypeEnum,
    required: false,
  })
  @ApiOkResponse({
    type: DisciplineTeachersResponse,
  })
  @ApiBadRequestResponse({
    description: `\n
    InvalidQueryException:
      Type of discipline must be a field of enum
    InvalidDisciplineIdException:
      Discipline with such id is not found`,
  })
  @ApiUnauthorizedResponse({
    description: `\n
    UnauthorizedException:
      Unauthorized`,
  })
  @ApiForbiddenResponse({
    description: `\n
    NoPermissionException:
      You do not have permission to perform this action`,
  })
  @Get('/:disciplineId/teachers')
  async getAllByDiscipline (
    @Param('disciplineId', DisciplineByIdPipe) disciplineId: string,
    @Query('disciplineType') disciplineType: DisciplineTypeEnum
  ) {
    const teachers = await this.disciplineService.getTeachers(disciplineId, disciplineType);
    return { teachers };
  }
}
