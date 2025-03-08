import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EduProgramResponse, EduProgramsResponse } from '@fictadvisor/utils/responses';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { EduProgramService } from './edu-program.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbEducationalProgram } from '../../../database/v2/entities/educational-program.entity';

@ApiTags('Eduprogram')
@Controller({
  version: '2',
  path: '/eduprograms',
})
export class EduProgramController {
  constructor (
    private readonly eduProgramService: EduProgramService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @ApiOkResponse({
    type: EduProgramsResponse,
  })
  @ApiEndpoint({
    summary: 'Get all education programs',
  })
  @Get()
  async getAll (): Promise<EduProgramsResponse> {
    const programs = await this.eduProgramService.getAll();
    const mappedPrograms = this.mapper.mapArray(programs, DbEducationalProgram, EduProgramResponse);

    return { programs: mappedPrograms };
  }
}
