import { Controller, Get, Query } from '@nestjs/common';
import { DateService } from '../../utils/date/DateService';
import { ConvertToBooleanPipe } from '../pipes/ConvertToBooleanPipe';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SemestersResponse } from '../responses/SemesterResponse';

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
    type: SemestersResponse,
  })
  async getPreviousSemesters (
    @Query('isFinished', ConvertToBooleanPipe) isFinished?
  ) {
    return { semesters: await this.dateService.getPreviousSemesters(isFinished as boolean) };
  }
}
