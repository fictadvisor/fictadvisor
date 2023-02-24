import { QuestionType } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class CreateQuestionDTO {

    @IsNotEmpty(validationOptionsMsg('Category can\'t be empty'))
      category: string;

    @IsEnum(QuestionType)
      type: QuestionType;

    @IsNotEmpty(validationOptionsMsg('Name can\'t be empty'))
      name: string;

    @IsNotEmpty(validationOptionsMsg('Text can\'t be empty'))
      text: string;

    @IsOptional()
      criteria?: string;

    @IsOptional()
      description?: string;

    @IsBoolean()
    @IsOptional()
      isRequired?: boolean;
}