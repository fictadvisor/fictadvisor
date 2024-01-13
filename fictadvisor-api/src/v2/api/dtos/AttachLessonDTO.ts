import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { EventTypeEnum } from './EventTypeEnum';

export class AttachLessonDTO {
  @ApiProperty()
  @IsNotEmpty(validationOptionsMsg('Discipline id cannot be empty'))
    disciplineId: string;

  @ApiProperty()
  @IsArray(validationOptionsMsg('Teachers must be Array'))
  @IsNotEmpty(validationOptionsMsg('Teachers cannot be empty (empty array is required)'))
    teachers: string[];

  @ApiProperty({
    enum: EventTypeEnum,
  })
  @IsEnum(EventTypeEnum, validationOptionsMsg('Event type must be an enum'))
  @IsNotEmpty()
    eventType: EventTypeEnum;

  @ApiPropertyOptional()
  @MaxLength(2000, validationOptionsMsg('Discipline description is too long (max: 2000)'))
  @IsOptional()
    disciplineInfo?: string;
}