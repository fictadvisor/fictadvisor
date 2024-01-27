import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiEndpoint } from 'src/v2/utils/documentation/decorators';
import { SpecialityResponses } from '../responses/SpecialityResponse';
import { SpecialityService } from '../services/SpecialityService';
import { SpecialityMapper } from '../../mappers/SpecialityMapper';

@ApiTags('Speciality')
@Controller({
  version: '2',
  path: '/specialities',
})
export class SpecialityController {
  constructor (
    private readonly specialityService: SpecialityService,
    private readonly specialityMapper: SpecialityMapper,
  ) {}

  @ApiOkResponse({
    type: SpecialityResponses,
  })
  @ApiEndpoint({
    summary: 'Get all specialities',
  })
  @Get()
  async getAll (): Promise<SpecialityResponses> {
    const specialities = await this.specialityService.getAll();
    return this.specialityMapper.getAll(specialities);
  }
}