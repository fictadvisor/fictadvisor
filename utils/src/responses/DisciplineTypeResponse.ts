import { ApiProperty } from '@nestjs/swagger';
import { EventTypeEnum } from '../enums/other/EventTypeEnum';

export class DisciplineTypeResponse {
  @ApiProperty({
    description: 'Discipline type id',
  })
    id: string;
  @ApiProperty({
    description: 'Discipline\'s id',
  })
    disciplineId: string;
  @ApiProperty({
    enum: EventTypeEnum,
    description: 'Event type',
  })
    name: EventTypeEnum;
}