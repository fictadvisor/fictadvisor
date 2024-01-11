import { QuestionType, QuestionDisplay } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, Min, Max, MinLength, MaxLength } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionDTO {
  @ApiProperty({
    description: 'Order of question',
  })
  @IsNotEmpty(validationOptionsMsg('Order cannot be empty'))
  @Min(1, validationOptionsMsg('Order is too short (min: 1)'))
  @Max(50, validationOptionsMsg('Order is too long (max: 50)'))
    order: number;

  @ApiProperty({
    description: 'Name of question',
  })
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
  @MinLength(5, validationOptionsMsg('Name is too short (min: 5)'))
  @MaxLength(50, validationOptionsMsg('Name is too long (max: 50)'))
    name: string;

  @ApiProperty({
    description: 'Text of question',
  })
  @IsNotEmpty(validationOptionsMsg('Text cannot be empty'))
  @MinLength(5, validationOptionsMsg('Text is too short (min: 5)'))
  @MaxLength(250, validationOptionsMsg('Text is too long (max: 250)'))
    text: string;

  @ApiProperty({
    description: 'Category of question',
  })
  @IsNotEmpty(validationOptionsMsg('Category cannot be empty'))
  @MinLength(5, validationOptionsMsg('Category is too short (min: 5)'))
  @MaxLength(50, validationOptionsMsg('Category is too long (max: 50)'))
    category: string;

  @ApiPropertyOptional({
    description: 'Description of question',
  })
  @IsOptional()
  @MaxLength(2000, validationOptionsMsg('Description is too long (max: 2000)'))
    description?: string;

  @ApiPropertyOptional({
    description: 'Criteria of question',
  })
  @IsOptional()
  @MaxLength(2000, validationOptionsMsg('Criteria is too long (max: 2000)'))
    criteria?: string;

  @ApiProperty({
    enum: QuestionType,
    description: 'An enum of question\'s type',
  })
  @IsEnum(QuestionType, validationOptionsMsg('Type must be an enum'))
    type: QuestionType;

  @ApiProperty({
    enum: QuestionDisplay,
    description: 'An enum of question\'s display',
  })
  @IsEnum(QuestionDisplay, validationOptionsMsg('Display must be an enum'))
    display: QuestionDisplay;

  @ApiPropertyOptional({
    default: true,
    description: 'Shows whether question is required',
  })
  @IsBoolean(validationOptionsMsg('Requirement parameter must be a boolean'))
  @IsOptional()
    isRequired?: boolean;
}
