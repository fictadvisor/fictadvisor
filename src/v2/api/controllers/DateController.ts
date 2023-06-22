import { Controller, Get, Query } from '@nestjs/common';
import { DateService } from '../../utils/date/DateService';
import { ConvertToBooleanPipe } from '../pipes/ConvertToBooleanPipe';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SemesterResponse } from '../responses/SemesterResponse';

@ApiTags('Date')
@Controller({
  version: '2',
  path: '/dates',
})
export class DateController {
  constructor (
    private dateService: DateService,
  ) {}

  @Get('/semesters')
  @ApiOkResponse({
    type: [SemesterResponse],
  })
  async getPreviousSemesters (
    @Query('isFinished', ConvertToBooleanPipe) isFinished?
  ) {
    return this.dateService.getPreviousSemesters(isFinished as boolean);
  }
}
