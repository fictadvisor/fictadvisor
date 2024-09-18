import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';

export class RemainingSelectivesDTO {
  @ApiProperty({
    description: 'The certain year of the selective discipline',
  })
  @IsNumber({}, validationOptionsMsg('Year must be a number'))
  @IsNotEmpty(validationOptionsMsg('Year cannot be empty'))
    year: number;

  @ApiProperty({
    description: 'The certain semester of the selective discipline',
  })
  @IsNumber({}, validationOptionsMsg('Semester must be a number'))
  @IsNotEmpty(validationOptionsMsg('Semester cannot be empty'))
    semester: number;
}
