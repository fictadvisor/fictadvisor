import { QuestionDisplay, QuestionType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../utils/GLOBALS';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateQuestionDTO {
    @ApiPropertyOptional()
    @IsOptional()
      text?: string;

    @ApiPropertyOptional()
    @IsOptional()
      name?: string;

    @ApiPropertyOptional()
    @IsOptional()
      order?: number;

    @ApiPropertyOptional()
    @IsOptional()
      criteria?: string;

    @ApiPropertyOptional({
      enum: QuestionType,
    })
    @IsEnum(QuestionType, validationOptionsMsg('Type is not an enum'))
    @IsOptional()
      type?: QuestionType;

    @ApiPropertyOptional({
      enum: QuestionDisplay,
    })
    @IsEnum(QuestionDisplay, validationOptionsMsg('Type is not an enum'))
    @IsOptional()
      display?: QuestionDisplay;
}