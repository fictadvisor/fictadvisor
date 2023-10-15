import { QuestionType } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionDTO {
    @ApiProperty({
      description: 'Category of question',
    })
    @IsNotEmpty(validationOptionsMsg('Category can not be empty'))
      category: string;

    @ApiProperty({
      enum: QuestionType,
      description: 'An enum of question\'s type',
    })
    @IsEnum(QuestionType, validationOptionsMsg('Type is not an enum'))
      type: QuestionType;

    @ApiProperty({
      description: 'Name of question',
    })
    @IsNotEmpty(validationOptionsMsg('Name can not be empty'))
      name: string;

    @ApiProperty({
      description: 'Order of question',
    })
    @IsNotEmpty(validationOptionsMsg('Order can not be empty'))
      order: number;

    @ApiProperty({
      description: 'Text of question',
    })
    @IsNotEmpty(validationOptionsMsg('Text can not be empty'))
      text: string;

    @ApiPropertyOptional({
      description: 'Criteria of question',
    })
    @IsOptional()
      criteria?: string;

    @ApiPropertyOptional({
      description: 'Description of question',
    })
    @IsOptional()
      description?: string;

    @ApiPropertyOptional({
      default: true,
      description: 'Shows whether question is required',
    })
    @IsBoolean(validationOptionsMsg('Requirement parameter is not a boolean'))
    @IsOptional()
      isRequired?: boolean;
}