import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQueueUserDTO {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
    id: number;

  @IsOptional()
  @IsBoolean()
  @Type(() => (v) => v === 'true')
    force: boolean;
}