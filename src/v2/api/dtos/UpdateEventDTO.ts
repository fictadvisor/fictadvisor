import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsUrl, MaxLength, MinLength } from 'class-validator';
import { DisciplineTypeEnum, Period } from '@prisma/client';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateEventDTO {

  @ApiProperty({
    minimum: 1,
  })
  @IsNotEmpty()
    week: number;

  @ApiPropertyOptional()
  @IsOptional()
  @MinLength(2, validationOptionsMsg('Name is too short (min: 2)'))
  @MaxLength(100, validationOptionsMsg('Name is too long (max: 100)'))
    name?: string;

  @ApiPropertyOptional()
  @IsOptional()
    disciplineId?: string;

  @ApiPropertyOptional({
    enum: DisciplineTypeEnum,
  })
  @IsOptional()
  @IsEnum(DisciplineTypeEnum, validationOptionsMsg('Discipline type must be an enum'))
    disciplineType?: DisciplineTypeEnum;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray(validationOptionsMsg('Teachers must be Array'))
    teachers?: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate(validationOptionsMsg('Start time must be Date'))
    startTime?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
    changeStartDate?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate(validationOptionsMsg('End time must be Date'))
    endTime?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
    changeEndDate?: boolean;

  @ApiPropertyOptional({
    enum: Period,
  })
  @IsOptional()
  @IsEnum(Period, validationOptionsMsg('Period must be an enum'))
    period?: Period;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(undefined, validationOptionsMsg('Url must be a URL address'))
    url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(2000, validationOptionsMsg('Discipline description is too long (max: 2000)'))
    disciplineInfo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @MaxLength(2000, validationOptionsMsg('Event description is too long (max: 2000)'))
    eventInfo?: string;
}

