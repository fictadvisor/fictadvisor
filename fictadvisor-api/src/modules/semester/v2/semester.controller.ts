import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PERMISSION } from '@fictadvisor/utils/security';
import {
  CreateSemesterDateDTO,
  UpdatePollDatesDTO,
  UpdateSemesterDateDTO,
} from '@fictadvisor/utils/requests';
import { PollDatesListResponse } from '@fictadvisor/utils/responses';
import { DateService } from '../../date/v2/date.service';
import { ApiEndpoint } from '../../../common/decorators/api-endpoint.decorator';
import { DateDocumentation } from '../../../common/documentation/modules/v2/date';

// Shares the `/dates` prefix with the public DateController, but lives in its
// own module: everything here is permission-guarded, and DateModule is imported
// by half the app (and by unit tests) that have no business pulling the auth
// stack in behind it.
@ApiTags('Dates')
@Controller({
  version: '2',
  path: '/dates',
})
export class SemesterController {
  constructor (
    private dateService: DateService,
  ) {}

  // Unlike `/semesters`, this one also lists semesters that have not started —
  // the admin panel has to configure them before they do.
  @ApiEndpoint({
    summary: 'Get every configured semester',
    documentation: DateDocumentation.GET_ALL_SEMESTERS,
    permissions: PERMISSION.ADMIN_PANEL_SEMESTERS_SHOW,
  })
  @Get('/semesters/all')
  async getAllSemesters () {
    return { semesters: await this.dateService.getAllSemesters() };
  }

  @ApiEndpoint({
    summary: 'Create a semester',
    documentation: DateDocumentation.CREATE_SEMESTER,
    permissions: PERMISSION.SEMESTERS_CREATE,
  })
  @Post('/semesters')
  async createSemester (
    @Body() body: CreateSemesterDateDTO,
  ) {
    return this.dateService.createSemester(body);
  }

  @ApiEndpoint({
    summary: 'Update the dates of a semester',
    documentation: DateDocumentation.UPDATE_SEMESTER,
    permissions: PERMISSION.SEMESTERS_UPDATE,
  })
  @Patch('/semesters/:year/:semester')
  async updateSemester (
    @Param('year', ParseIntPipe) year: number,
    @Param('semester', ParseIntPipe) semester: number,
    @Body() body: UpdateSemesterDateDTO,
  ) {
    return this.dateService.updateSemester({ year, semester }, body);
  }

  @ApiEndpoint({
    summary: 'Delete a semester',
    documentation: DateDocumentation.DELETE_SEMESTER,
    permissions: PERMISSION.SEMESTERS_DELETE,
  })
  @Delete('/semesters/:year/:semester')
  async deleteSemester (
    @Param('year', ParseIntPipe) year: number,
    @Param('semester', ParseIntPipe) semester: number,
  ): Promise<void> {
    return this.dateService.deleteSemester({ year, semester });
  }

  @ApiEndpoint({
    summary: 'Get the poll borders of every semester',
    documentation: DateDocumentation.GET_POLL_DATES,
    permissions: PERMISSION.POLL_DATES_GET,
  })
  @Get('/pollDates')
  async getPollDates (): Promise<PollDatesListResponse> {
    const pollDates = await this.dateService.getPollDates();

    return {
      pollDates: pollDates.map(({ year, semester, startPoll, endPoll }) => ({
        year,
        semester,
        startPoll: startPoll?.toISOString() ?? null,
        endPoll: endPoll?.toISOString() ?? null,
      })),
    };
  }

  @ApiEndpoint({
    summary: 'Clear the poll borders of a semester',
    documentation: DateDocumentation.DELETE_POLL_DATES,
    permissions: PERMISSION.POLL_DATES_DELETE,
  })
  @Delete('/pollDates/:year/:semester')
  async deletePollDates (
    @Param('year', ParseIntPipe) year: number,
    @Param('semester', ParseIntPipe) semester: number,
  ): Promise<void> {
    return this.dateService.deletePollDates({ year, semester });
  }

  @ApiEndpoint({
    summary: 'Set when the poll of a semester opens and closes',
    documentation: DateDocumentation.UPDATE_POLL_DATES,
    permissions: PERMISSION.POLL_DATES_UPDATE,
  })
  @Put('/pollDates/:year/:semester')
  async updatePollDates (
    @Param('year', ParseIntPipe) year: number,
    @Param('semester', ParseIntPipe) semester: number,
    @Body() body: UpdatePollDatesDTO,
  ) {
    return this.dateService.setPollDates({ year, semester }, body);
  }
}
