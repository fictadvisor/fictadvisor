import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsIn, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../validation.util';

export class CreateSemesterDateDTO {
  @ApiProperty({
    description: 'Academic year',
  })
  @IsNotEmpty(validationOptionsMsg('Year cannot be empty'))
  @IsNumber({}, validationOptionsMsg('Year must be of type number'))
    year: number;

  @ApiProperty({
    enum: [1, 2],
    enumName: 'SemesterNumber',
    description: 'Semester number',
  })
  @IsNotEmpty(validationOptionsMsg('Semester cannot be empty'))
  @IsIn([1, 2], validationOptionsMsg('Semester must be either 1 or 2'))
    semester: number;

  @ApiProperty({
    description: 'First day of the semester',
  })
  @IsNotEmpty(validationOptionsMsg('Start date cannot be empty'))
  @Type(() => Date)
  @IsDate(validationOptionsMsg('Start date must be a valid Date'))
    startDate: Date;

  @ApiProperty({
    description: 'Last day of the semester',
  })
  @IsNotEmpty(validationOptionsMsg('End date cannot be empty'))
  @Type(() => Date)
  @IsDate(validationOptionsMsg('End date must be a valid Date'))
    endDate: Date;
}

export class UpdateSemesterDateDTO {
  @ApiPropertyOptional({
    description: 'First day of the semester',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate(validationOptionsMsg('Start date must be a valid Date'))
    startDate?: Date;

  @ApiPropertyOptional({
    description: 'Last day of the semester',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate(validationOptionsMsg('End date must be a valid Date'))
    endDate?: Date;
}
