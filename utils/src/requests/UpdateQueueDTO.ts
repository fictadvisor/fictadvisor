import { IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateQueueDTO {
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
    active: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
    open: boolean;
}