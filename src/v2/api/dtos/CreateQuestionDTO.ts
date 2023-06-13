import { QuestionType } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuestionDTO {
    @ApiProperty()
    @IsNotEmpty(validationOptionsMsg('Category can not be empty'))
      category: string;

    @ApiProperty({
      enum: QuestionType,
    })
    @IsEnum(QuestionType, validationOptionsMsg('Type is not an enum'))
      type: QuestionType;

    @ApiProperty()
    @IsNotEmpty(validationOptionsMsg('Name can not be empty'))
      name: string;

    @ApiProperty()
    @IsNotEmpty(validationOptionsMsg('Order can not be empty'))
      order: number;

    @ApiProperty()
    @IsNotEmpty(validationOptionsMsg('Text can not be empty'))
      text: string;

    @ApiPropertyOptional()
    @IsOptional()
      criteria?: string;

    @ApiPropertyOptional()
    @IsOptional()
      description?: string;

    @ApiPropertyOptional({
      default: true,
    })
    @IsBoolean(validationOptionsMsg('Requirement parameter is not a boolean'))
    @IsOptional()
      isRequired?: boolean;
}