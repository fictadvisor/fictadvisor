import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsUrl, IsUUID, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { Period } from '@prisma/client';
import { EventTypeEnum } from './EventTypeEnum';
import { Type } from 'class-transformer';

export class CreateEventDTO {
  @ApiProperty({
    description: 'Id of a group',
  })
  @IsUUID()
  @IsNotEmpty(validationOptionsMsg('Group id cannot be empty'))
    groupId: string;

  @ApiProperty({
    description: 'Name of the event',
  })
  @MinLength(2, validationOptionsMsg('Name is too short (min: 2)'))
  @MaxLength(150, validationOptionsMsg('Name is too long (max: 150)'))
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
    name: string;

  @ApiPropertyOptional({
    description: 'Id of a discipline',
  })
  @IsOptional()
    disciplineId?: string;

  @ApiPropertyOptional({
    description: 'Event\'s type',
    enum: EventTypeEnum,
  })
  @IsOptional()
  @IsEnum(EventTypeEnum, validationOptionsMsg('Event type must be an enum'))
    eventType?: EventTypeEnum;

  @ApiPropertyOptional({
    description: 'List of teachers',
  })
  @IsArray(validationOptionsMsg('Teachers must be Array'))
  @IsNotEmpty(validationOptionsMsg('Teachers cannot be empty (empty array is required)'))
    teachers: string[];

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
    enum: Period,
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
    description: 'Description of the discipline',
  })
  @MaxLength(2000, validationOptionsMsg('Discipline description is too long (max: 2000)'))
  @IsOptional()
    disciplineInfo?: string;

  @ApiPropertyOptional({
    description: 'Description of the event',
  })
  @MaxLength(2000, validationOptionsMsg('Event description is too long (max: 2000)'))
  @IsOptional()
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