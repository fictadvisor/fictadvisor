import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SpecialitiesResponse } from '@fictadvisor/utils/responses';
import { ApiEndpoint } from '../../../common/decorators/ApiEndpoint';
import { SpecialityMapper } from '../../../common/mappers/SpecialityMapper';
import { SpecialityService } from './SpecialityService';

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
    type: SpecialitiesResponse,
  })
  @ApiEndpoint({
    summary: 'Get all specialities',
  })
  @Get()
  async getAll (): Promise<SpecialitiesResponse> {
    const specialities = await this.specialityService.getAll();
    return this.specialityMapper.getAll(specialities);
  }
}
