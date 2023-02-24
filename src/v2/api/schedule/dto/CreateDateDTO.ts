import { Type } from 'class-transformer';

export class CreateDateDTO {
  @Type(() => Date)
    startDate: Date;

  @Type(() => Date)
    endDate: Date;
}