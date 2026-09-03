import { ApiProperty } from '@nestjs/swagger';

export class PollDatesResponse {
  @ApiProperty({
    description: 'Academic year of the polled semester',
  })
    year: number;

  @ApiProperty({
    description: 'Number of the polled semester',
  })
    semester: number;

  @ApiProperty({
    type: Date,
    nullable: true,
    description: 'The moment the poll opens, null when it was never set',
  })
    startPoll: string | null;

  @ApiProperty({
    type: Date,
    nullable: true,
    description: 'The moment the poll closes, null when it was never set',
  })
    endPoll: string | null;
}

export class PollDatesListResponse {
  @ApiProperty({
    type: [PollDatesResponse],
    description: 'Poll borders of every known semester, newest first',
  })
    pollDates: PollDatesResponse[];
}
