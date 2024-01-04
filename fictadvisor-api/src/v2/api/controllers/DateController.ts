import { Controller, Get, Query } from '@nestjs/common';
import { DateService } from '../../utils/date/DateService';
import { ConvertToBooleanPipe } from '../pipes/ConvertToBooleanPipe';
import { ApiBadRequestResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CurrentSemester, SemestersResponse } from '../responses/SemesterResponse';

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
  @ApiOkResponse({
    type: SemestersResponse,
  })
  @ApiQuery({
    name: 'isFinished',
    type: Boolean,
    required: false,
  })
  async getPreviousSemesters (
    @Query('isFinished', ConvertToBooleanPipe) isFinished?
  ) {
    return { semesters: await this.dateService.getPreviousSemesters(isFinished as boolean) };
  }

  @Get('/current/semester')
  @ApiOkResponse({
    type: CurrentSemester,
  })
  @ApiBadRequestResponse({
    description: `\n
    DataNotFoundException:
      Data was not found`,
  })
  getCurrentSemester () {
    return this.dateService.getCurrentSemester();
  }
}
