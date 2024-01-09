import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ComplaintDTO {
  @ApiPropertyOptional({
    description: 'Student\'s full name',
  })
  @IsString()
  @IsOptional()
  @MinLength(5, validationOptionsMsg('Full name is too short (min: 5)'))
  @MaxLength(50, validationOptionsMsg('Full name is too long (max: 50)'))
    fullName?: string;

  @ApiPropertyOptional({
    description: 'Student\'s group id',
  })
  @IsUUID()
  @IsOptional()
    groupId?: string;

  @ApiProperty({
    description: 'Title of complaint',
  })
  @IsString()
  @IsNotEmpty(validationOptionsMsg('Title can not be empty'))
  @MinLength(5, validationOptionsMsg('Title is too short (min: 5)'))
  @MaxLength(100, validationOptionsMsg('Title is too long (max: 100)'))
    title: string;

  @ApiProperty({
    description: 'Message of complaint',
  })
  @IsString()
  @IsNotEmpty(validationOptionsMsg('Message can not be empty'))
  @MinLength(10, validationOptionsMsg('Message is too short (min: 10)'))
  @MaxLength(3500, validationOptionsMsg('Message is too long (max: 3500)'))
    message: string;
}