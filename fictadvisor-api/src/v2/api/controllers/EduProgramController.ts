import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { EduProgramMapper } from '../../mappers/EduProgramMapper';
import { ApiEndpoint } from '../../utils/documentation/decorators';
import { EduProgramResponses } from '../responses/EduProgramResponse';
import { EduProgramService } from '../services/EduProgramService';

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
    type: EduProgramResponses,
  })
  @ApiEndpoint({
    summary: 'Get all education programs',
  })
  @Get()
  async getAll (): Promise<EduProgramResponses> {
    const programs = await this.eduProgramService.getAll();
    return this.eduProgramMapper.getAll(programs);
  }
}