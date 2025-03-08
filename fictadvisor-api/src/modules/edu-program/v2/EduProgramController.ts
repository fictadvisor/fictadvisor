import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EduProgramResponse, EduProgramsResponse } from '@fictadvisor/utils/responses';
import { ApiEndpoint } from '../../../common/decorators/ApiEndpoint';
import { EduProgramService } from './EduProgramService';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbEducationalProgram } from '../../../database/v2/entities/DbEducationalProgram';

@ApiTags('Eduprogram')
@Controller({
  version: '2',
  path: '/eduprograms',
})
export class EduProgramController {
  constructor (
    private readonly eduProgramService: EduProgramService,
    @InjectMapper() private mapper: Mapper,
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
    return { programs: this.mapper.mapArray(programs, DbEducationalProgram, EduProgramResponse) };
  }
}
