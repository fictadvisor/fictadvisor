import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EduProgramsResponse } from '@fictadvisor/utils/responses';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { EduProgramMapper } from '../../../common/mappers/edu-program.mapper';
import { EduProgramService } from './edu-program.service';

@ApiTags('Eduprogram')
@Controller({
  version: '2',
  path: '/eduprograms',
})
export class EduProgramController {
  constructor (
    private readonly eduProgramService: EduProgramService,
    private readonly eduProgramMapper: EduProgramMapper,
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
    return this.eduProgramMapper.getAll(programs);
  }
}
