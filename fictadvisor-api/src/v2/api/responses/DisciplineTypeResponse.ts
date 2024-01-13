import { ApiProperty } from '@nestjs/swagger';
import { EventTypeEnum } from '../dtos/EventTypeEnum';

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

export class GeneralDisciplineTypeResponse {
  @ApiProperty()
    id: string;
  @ApiProperty()
    disciplineId: string;
  @ApiProperty({
    enum: [EventTypeEnum.LECTURE, EventTypeEnum.PRACTICE, EventTypeEnum.LABORATORY],
  })
    name: EventTypeEnum;
}