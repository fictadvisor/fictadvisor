import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl, IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../ValidationUtil';
import { Period } from '../enums/db/PeriodEnum';
import { EventTypeEnum } from '../enums/other/EventTypeEnum';

export class UpdateEventDTO {
  @ApiProperty({
    minimum: 1,
    description: 'Week to which the event is linked',
  })
  @IsNotEmpty(validationOptionsMsg('Week cannot be empty'))
  @IsNumber({}, validationOptionsMsg('Week must be a number'))
    week: number;

  @ApiPropertyOptional({
    description: 'Event name',
  })
  @IsOptional()
  @MinLength(2, validationOptionsMsg('Name is too short (min: 2)'))
  @MaxLength(150, validationOptionsMsg('Name is too long (max: 150)'))
    name?: string;

  @ApiPropertyOptional({
    description: 'Discipline ID',
  })
  @IsOptional()
  @IsUUID(undefined, validationOptionsMsg('Discipline id must be formatted according to the UUID standard'))
    disciplineId?: string;

  @ApiPropertyOptional({
    enum: EventTypeEnum,
    description: 'Event type',
  })
  @IsOptional()
  @IsEnum(EventTypeEnum, validationOptionsMsg('Event type must be an enum'))
    eventType?: EventTypeEnum;

  @ApiPropertyOptional({
    description: 'Array of ids of the teachers to connect to the event',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Teacher ids field must be an array'))
  @IsUUID(undefined, validationOptionsMsg('Each element of teacherIds array must be formatted according to the UUID standard', true))
    teacherIds?: string[];

  @ApiPropertyOptional({
    description: 'Event start time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate(validationOptionsMsg('Start time must be a valid Date'))
    startTime?: Date;

  @ApiPropertyOptional({
    description: 'Indicator of whether the event start date has been changed',
  })
  @IsOptional()
  @IsBoolean(validationOptionsMsg('Change start date must be a boolean'))
    changeStartDate?: boolean;

  @ApiPropertyOptional({
    description: 'Event end time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate(validationOptionsMsg('End time must be a valid Date'))
    endTime?: Date;

  @ApiPropertyOptional({
    description: 'Indicator of whether the event end date has been changed',
  })
  @IsOptional()
  @IsBoolean(validationOptionsMsg('Change end date must be a boolean'))
    changeEndDate?: boolean;

  @ApiPropertyOptional({
    enum: Period,
    description: 'Period of the event\'s occurrence\n',
  })
  @IsOptional()
  @IsEnum(Period, validationOptionsMsg('Period must be an enum'))
    period?: Period;

  @ApiPropertyOptional({
    description: 'URL associated with the event',
  })
  @IsOptional()
  @IsUrl(undefined, validationOptionsMsg('Url field must be a valid URL address'))
    url?: string;

  @ApiPropertyOptional({
    description: 'Description of the discipline',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Discipline info must be a string'))
  @MaxLength(2000, validationOptionsMsg('Discipline description is too long (max: 2000)'))
    disciplineInfo?: string;

  @ApiPropertyOptional({
    description: 'Description of the event (or its first instance in case the event is periodic)',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Event description must be a string'))
  @MaxLength(2000, validationOptionsMsg('Event description is too long (max: 2000)'))
    eventInfo?: string;
}

