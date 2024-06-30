import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUrl,
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
  @IsNumber()
  @IsNotEmpty()
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
    disciplineId?: string;

  @ApiPropertyOptional({
    enum: EventTypeEnum,
    description: 'Type of event',
  })
  @IsOptional()
  @IsEnum(EventTypeEnum, validationOptionsMsg('Event type must be an enum'))
    eventType?: EventTypeEnum;

  @ApiPropertyOptional({
    description: 'An array of teachers linked to the event',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Teachers must be Array'))
    teachers?: string[];

  @ApiPropertyOptional({
    description: 'Event start time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate(validationOptionsMsg('Start time must be Date'))
    startTime?: Date;

  @ApiPropertyOptional({
    description: 'Indicator of whether the event start date has been changed',
  })
  @IsOptional()
  @IsBoolean()
    changeStartDate?: boolean;

  @ApiPropertyOptional({
    description: 'Event end time',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate(validationOptionsMsg('End time must be Date'))
    endTime?: Date;

  @ApiPropertyOptional({
    description: 'Indicator of whether the event end date has been changed',
  })
  @IsOptional()
  @IsBoolean()
    changeEndDate?: boolean;

  @ApiPropertyOptional({
    enum: Period,
    description: 'The period during which the event occurs.\n',
  })
  @IsOptional()
  @IsEnum(Period, validationOptionsMsg('Period must be an enum'))
    period?: Period;

  @ApiPropertyOptional({
    description: 'URL associated with the event',
  })
  @IsOptional()
  @IsUrl(undefined, validationOptionsMsg('Url must be a URL address'))
    url?: string;

  @ApiPropertyOptional({
    description: 'Description of the discipline',
  })
  @IsOptional()
  @MaxLength(2000, validationOptionsMsg('Discipline description is too long (max: 2000)'))
    disciplineInfo?: string;

  @ApiPropertyOptional({
    description: 'Description of the event',
  })
  @IsOptional()
  @MaxLength(2000, validationOptionsMsg('Event description is too long (max: 2000)'))
    eventInfo?: string;
}

