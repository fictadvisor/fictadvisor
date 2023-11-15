import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsUrl, IsUUID, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { DisciplineTypeEnum, Period } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateEventDTO {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty(validationOptionsMsg('Group id cannot be empty'))
    groupId: string;

  @ApiProperty()
  @MinLength(2, validationOptionsMsg('Name is too short (min: 2)'))
  @MaxLength(150, validationOptionsMsg('Name is too long (max: 150)'))
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
    name: string;

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
  @IsArray(validationOptionsMsg('Teachers must be Array'))
  @IsNotEmpty(validationOptionsMsg('Teachers cannot be empty (empty array is required)'))
    teachers: string[];

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Start time cannot be empty'))
  @Type(() => Date)
  @IsDate(validationOptionsMsg('Start time must be Date'))
    startTime: Date;

  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('End time cannot be empty'))
  @Type(() => Date)
  @IsDate(validationOptionsMsg('End time must be Date'))
    endTime: Date;

  @ApiProperty({
    enum: Period,
  })
  @IsNotEmpty(validationOptionsMsg('Period cannot be empty'))
  @IsEnum(Period, validationOptionsMsg('Period must be an enum'))
    period: Period;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl(undefined, validationOptionsMsg('Url must be a URL address'))
    url?: string;

  @ApiPropertyOptional()
  @MaxLength(2000, validationOptionsMsg('Discipline description is too long (max: 2000)'))
  @IsOptional()
    disciplineInfo?: string;

  @ApiPropertyOptional()
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