import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class RemainingSelectiveDTO {
    @ApiProperty()
    @Type(() => Number)
    @IsNumber({}, {
      message: 'year must be a number',
    })
      year: number;

    @ApiProperty()
    @Type(() => Number)
    @IsNumber({}, {
      message: 'semester must be a number',
    })
      semester: number;
}