import { QuestionType } from '@prisma/client';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { validationOptionsMsg } from '../../../utils/GLOBALS';

export class CreateQuestionDTO {

    @IsNotEmpty(validationOptionsMsg('Category can not be empty'))
      category: string;

    @IsEnum(QuestionType, validationOptionsMsg('Type is not an enum'))
      type: QuestionType;

    @IsNotEmpty(validationOptionsMsg('Name can not be empty'))
      name: string;

    @IsNotEmpty(validationOptionsMsg('Order can not be empty'))
      order: number;

    @IsNotEmpty(validationOptionsMsg('Text can not be empty'))
      text: string;

    @IsOptional()
      criteria?: string;

    @IsOptional()
      description?: string;

    @IsBoolean(validationOptionsMsg('Requirement parameter is not a boolean'))
    @IsOptional()
      isRequired?: boolean;
}