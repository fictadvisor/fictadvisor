import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
  MinLength,
  MaxLength,
  IsNumber,
  IsString,
} from 'class-validator';
import { validationOptionsMsg } from '../ValidationUtil';
import { QuestionType, QuestionDisplay } from '../enums';

export class CreateQuestionDTO {
  @ApiProperty({
    description: 'Order of question',
  })
  @IsNotEmpty(validationOptionsMsg('Order cannot be empty'))
  @Min(1, validationOptionsMsg('Order is too short (min: 1)'))
  @Max(50, validationOptionsMsg('Order is too long (max: 50)'))
  @IsNumber({}, validationOptionsMsg('Order must be a number'))
    order: number;

  @ApiProperty({
    description: 'Name of question',
  })
  @IsNotEmpty(validationOptionsMsg('Name cannot be empty'))
  @MinLength(5, validationOptionsMsg('Name is too short (min: 5)'))
  @MaxLength(50, validationOptionsMsg('Name is too long (max: 50)'))
  @IsString(validationOptionsMsg('Name must be string'))
    name: string;

  @ApiProperty({
    description: 'Text of question',
  })
  @IsNotEmpty(validationOptionsMsg('Text cannot be empty'))
  @MinLength(5, validationOptionsMsg('Text is too short (min: 5)'))
  @MaxLength(250, validationOptionsMsg('Text is too long (max: 250)'))
  @IsString(validationOptionsMsg('Text must be string'))
    text: string;

  @ApiProperty({
    description: 'Category of question',
  })
  @IsNotEmpty(validationOptionsMsg('Category cannot be empty'))
  @MinLength(5, validationOptionsMsg('Category is too short (min: 5)'))
  @MaxLength(50, validationOptionsMsg('Category is too long (max: 50)'))
  @IsString(validationOptionsMsg('Category muse be string'))
    category: string;

  @ApiPropertyOptional({
    description: 'Description of question',
  })
  @IsOptional()
  @MaxLength(2000, validationOptionsMsg('Description is too long (max: 2000)'))
  @IsString(validationOptionsMsg('Description must be string'))
    description?: string;

  @ApiPropertyOptional({
    description: 'Criteria of question',
  })
  @IsOptional()
  @MaxLength(2000, validationOptionsMsg('Criteria is too long (max: 2000)'))
  @IsString(validationOptionsMsg('Criteria must be string'))
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
  @IsOptional()
  @IsBoolean(validationOptionsMsg('Requirement parameter must be a boolean'))
    isRequired?: boolean;
}
