import { QuestionDisplay, QuestionType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class UpdateQuestionDTO {
    @IsOptional()
      text?: string;

    @IsOptional()
      name?: string;

    @IsOptional()
      order?: number;

    @IsOptional()
      criteria?: string;

    @IsEnum(QuestionType, validationOptionsMsg('Type is not an enum'))
    @IsOptional()
      type?: QuestionType;

    @IsEnum(QuestionDisplay, validationOptionsMsg('Type is not an enum'))
    @IsOptional()
      display?: QuestionDisplay;
}