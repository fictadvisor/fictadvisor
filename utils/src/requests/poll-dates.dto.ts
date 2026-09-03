import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class UpdatePollDatesDTO {
  @ApiProperty({
    description: 'The moment the poll of the semester opens',
  })
  @IsNotEmpty(validationOptionsMsg('Start of the poll cannot be empty'))
  @Type(() => Date)
  @IsDate(validationOptionsMsg('Start of the poll must be a valid Date'))
    startPoll: Date;

  @ApiProperty({
    description: 'The moment the poll of the semester closes',
  })
  @IsNotEmpty(validationOptionsMsg('End of the poll cannot be empty'))
  @Type(() => Date)
  @IsDate(validationOptionsMsg('End of the poll must be a valid Date'))
    endPoll: Date;
}
