import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { QueuePositionStatus } from '../enums/db/QueuePositionStatusEnum';

export class UpdateQueueUserDTO {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
    position: number;

  @IsOptional()
  @IsEnum(QueuePositionStatus)
    status: QueuePositionStatus;
}