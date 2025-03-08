import { ApiProperty } from '@nestjs/swagger';
import { Period } from '../enums';
import { TelegramShortEventResponse } from './short-event.response';
import { AutoMap } from '@automapper/classes';
import { ShortTeacherResponse } from './teacher.response';

export class EventResponse extends TelegramShortEventResponse {
  @ApiProperty({
    description: 'Id of the discipline associated with the event',
  })
  @AutoMap()
    disciplineId: string;

  @ApiProperty({
    enum: Period,
    description: 'The period during which the event occurs',
  })
  @AutoMap(() => String)
    period: Period;

  @ApiProperty({
    description: 'Information about the discipline',
  })
  @AutoMap()
    disciplineInfo: string;

  @ApiProperty({
    type: [ShortTeacherResponse],
    description: 'An array of teachers linked to the event',
  })
  @AutoMap(() => [ShortTeacherResponse])
    teachers: ShortTeacherResponse[];
}
