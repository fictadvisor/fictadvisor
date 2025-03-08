import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SpecialitiesResponse, SpecialityResponse } from '@fictadvisor/utils/responses';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { SpecialityService } from './speciality.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { DbSpeciality } from '../../../database/v2/entities/speciality.entity';

@ApiTags('Speciality')
@Controller({
  version: '2',
  path: '/specialities',
})
export class SpecialityController {
  constructor (
    private readonly specialityService: SpecialityService,
    @InjectMapper() private readonly mapper: Mapper,
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
    const mappedSpecialities = this.mapper.mapArray(specialities, DbSpeciality, SpecialityResponse);

    return { specialities: mappedSpecialities };
  }
}
