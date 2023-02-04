import { QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
export class CreateQuestionsDTO {

    @ValidateNested({ each: true })
    @Type(() => CreateQuestionData)
      questions: CreateQuestionData[];
}

export class CreateQuestionData {

    @IsNotEmpty()
      category: string;

    @IsEnum(QuestionType)
      type: QuestionType;

    @IsNotEmpty()
      name: string;

    @IsNotEmpty()
      text: string;

    @IsOptional()
      criteria?: string;

    @IsOptional()
      description?: string;

    @IsBoolean()
      isRequired?: boolean;
}