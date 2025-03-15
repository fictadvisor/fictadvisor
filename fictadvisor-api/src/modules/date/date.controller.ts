import { Controller, Get, ParseBoolPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DateService } from './date.service';
import { ApiEndpoint } from '../../common/decorators/api-endpoint.decorator';
import { DateDocumentation } from '../../common/documentation/modules/v2/date';

@ApiTags('Dates')
@Controller({
  version: '2',
  path: '/dates',
})
export class DateController {
  constructor (
    private dateService: DateService,
  ) {}

  @Get('/semesters')
  @ApiEndpoint({
    summary: 'Gets recent semesters',
    documentation: DateDocumentation.GET_PREVIOUS_SEMESTERS,
  })
  async getPreviousSemesters (
    @Query('isFinished', ParseBoolPipe) isFinished: boolean,
  ) {
    return this.dateService.getPreviousSemesters(isFinished);
  }

  @Get('/current/semester')
  @ApiEndpoint({
    summary: 'Get current semester',
    documentation: DateDocumentation.GET_CURRENT_SEMESTER,
  })
  getCurrentSemester () {
    return this.dateService.getCurrentSemester();
  }
}
