import { ApiProperty } from '@nestjs/swagger';

export class HasCalendarResponse {
  @ApiProperty({
    description: 'Indicates whether the user already has his schedule moved to google calendar'
  })
    hasCalendar: boolean;
}
