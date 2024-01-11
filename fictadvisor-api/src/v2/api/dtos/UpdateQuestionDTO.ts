import { QuestionDisplay, QuestionType } from '@prisma/client';
import { IsBoolean, IsEnum, IsOptional, Min, Max, MinLength, MaxLength  } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuestionDTO {
  @ApiPropertyOptional({
    description: 'Order of question',
  })
  @IsOptional()
  @Min(1, validationOptionsMsg('Order is too short (min: 1)'))
  @Max(50, validationOptionsMsg('Order is too long (max: 50)'))
    order?: number;

  @ApiPropertyOptional({
    description: 'Name of question',
  })
  @IsOptional()
  @MinLength(5, validationOptionsMsg('Name is too short (min: 5)'))
  @MaxLength(50, validationOptionsMsg('Name is too long (max: 50)'))
    name?: string;

  @ApiPropertyOptional({
    description: 'Text of question',
  })
  @IsOptional()
  @MinLength(5, validationOptionsMsg('Text is too short (min: 5)'))
  @MaxLength(250, validationOptionsMsg('Text is too long (max: 250)'))
    text?: string;

  @ApiPropertyOptional({
    description: 'Category of question',
  })
  @IsOptional()
  @MinLength(5, validationOptionsMsg('Category is too short (min: 5)'))
  @MaxLength(50, validationOptionsMsg('Category is too long (max: 50)'))
    category?: string;

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

  @ApiPropertyOptional({
    enum: QuestionType,
    description: 'An enum of question\'s type',
  })
  @IsEnum(QuestionType, validationOptionsMsg('Type must be an enum'))
  @IsOptional()
    type?: QuestionType;

  @ApiPropertyOptional({
    enum: QuestionDisplay,
    description: 'An enum of question\'s display',
  })
  @IsEnum(QuestionDisplay, validationOptionsMsg('Display must be an enum'))
  @IsOptional()
    display?: QuestionDisplay;

  @ApiPropertyOptional({
    default: true,
    description: 'Shows whether question is required',
  })
  @IsBoolean(validationOptionsMsg('Requirement parameter must be a boolean'))
  @IsOptional()
    isRequired?: boolean;
}
