import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { validationOptionsMsg } from '../validation.util';
import { Period } from '../enums';
import { EventTypeEnum } from '../enums';

export class CreateEventDTO {
  @ApiProperty({
    description: 'Id of the group',
  })
  @IsNotEmpty(validationOptionsMsg('Group id cannot be empty'))
  @IsUUID(undefined, validationOptionsMsg('Group id must be formatted according to the UUID standard'))
    groupId: string;

  @ApiProperty({
    description: 'Name of the event',
  })
  @MinLength(2, validationOptionsMsg('Name is too short (min: 2)'))
  @MaxLength(150, validationOptionsMsg('Name is too long (max: 150)'))
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
    name: string;

  @ApiPropertyOptional({
    description: 'Id of the event\'s connected discipline',
  })
  @IsOptional()
  @IsUUID(undefined, validationOptionsMsg('Discipline id must be formatted according to the UUID standard'))
    disciplineId?: string;

  @ApiPropertyOptional({
    description: 'Event type',
    enum: EventTypeEnum,
  })
  @IsOptional()
  @IsEnum(EventTypeEnum, validationOptionsMsg('Event type must be an enum'))
    eventType?: EventTypeEnum;

  @ApiPropertyOptional({
    description: 'List of ids of teachers, who teach the discipline',
  })
  @IsOptional()
  @IsArray(validationOptionsMsg('Teacher ids field must be an array'))
  @IsUUID(undefined, validationOptionsMsg('Each element of teacher ids array must be formatted according to the UUID standard', true))
    teacherIds: string[] = [];

  @ApiProperty({
    description: 'Start time of the event',
  })
  @IsNotEmpty(validationOptionsMsg('Start time cannot be empty'))
  @Type(() => Date)
  @IsDate(validationOptionsMsg('Start time must be a valid Date'))
    startTime: Date;

  @ApiProperty({
    description: 'End time of the event',
  })
  @IsNotEmpty(validationOptionsMsg('End time cannot be empty'))
  @Type(() => Date)
  @IsDate(validationOptionsMsg('End time must be of type Date'))
    endTime: Date;

  @ApiProperty({
    description: 'Event recurrence period',
    enum: Period,
  })
  @IsNotEmpty(validationOptionsMsg('Period cannot be empty'))
  @IsEnum(Period, validationOptionsMsg('Period must be an enum'))
    period: Period;

  @ApiPropertyOptional({
    description: 'Link attached to the event',
  })
  @IsOptional()
  @IsUrl(undefined, validationOptionsMsg('Url must be a valid URL address'))
    url?: string;

  @ApiPropertyOptional({
    description: 'Description of the discipline',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Discipline description must be a string'))
  @MaxLength(2000, validationOptionsMsg('Discipline description is too long (max: 2000)'))
    disciplineInfo?: string;

  @ApiPropertyOptional({
    description: 'Description of the event',
  })
  @IsOptional()
  @IsString(validationOptionsMsg('Event description must be a string'))
  @MaxLength(2000, validationOptionsMsg('Event description is too long (max: 2000)'))
    eventInfo?: string;
}

export class CreateSimpleTelegramEvent {
  @ApiProperty({
    description: 'Id of a group',
  })
  @IsNotEmpty(validationOptionsMsg('Group id cannot be empty'))
  @IsUUID(undefined, validationOptionsMsg('Group id must be in UUID format'))
    groupId: string;
  
  @ApiProperty({
    description: 'Name of the event',
  })
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
  @MinLength(2, validationOptionsMsg('Name is too short (min: 2)'))
  @MaxLength(150, validationOptionsMsg('Name is too long (max: 150)'))
    name: string;
  
  @ApiProperty({
    description: 'Start time of the event',
  })
  @IsNotEmpty(validationOptionsMsg('Start time cannot be empty'))
  @Type(() => Date)
  @IsDate(validationOptionsMsg('Start time must be Date'))
    startTime: Date;
  
  @ApiProperty({
    description: 'End time of the event',
  })
  @IsNotEmpty(validationOptionsMsg('End time cannot be empty'))
  @Type(() => Date)
  @IsDate(validationOptionsMsg('End time must be Date'))
    endTime: Date;
  
  @ApiProperty({
    description: 'Event\'s period',
  })
  @IsNotEmpty(validationOptionsMsg('Period cannot be empty'))
  @IsEnum(Period, validationOptionsMsg('Period must be an enum'))
    period: Period;
  
  @ApiPropertyOptional({
    description: 'Attached link to the event',
  })
  @IsOptional()
  @IsUrl(undefined, validationOptionsMsg('Url must be a URL address'))
    url?: string;
  
  @ApiPropertyOptional({
    description: 'Description of the event',
  })
  @IsOptional()
  @MaxLength(2000, validationOptionsMsg('Event description is too long (max: 2000)'))
    eventInfo?: string;
}
