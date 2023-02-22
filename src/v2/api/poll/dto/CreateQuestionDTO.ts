import { QuestionDisplay, QuestionType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';
import { CreateQuestionRoleDTO } from './CreateQuestionRoleDTO';
export class CreateQuestionsDTO {

    @ValidateNested({ each: true })
    @Type(() => CreateQuestionDTO)
      questions: CreateQuestionDTO[];
}

export class CreateQuestionDTO {

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

    @IsEnum(QuestionDisplay)
      display: QuestionDisplay;

    @IsBoolean()
    @IsOptional()
      isRequired?: boolean;
}

export class CreateQuestionWithRolesDTO extends CreateQuestionDTO {
    @ValidateNested({ each: true })
    @Type(() => CreateQuestionRoleDTO)
      roles: CreateQuestionRoleDTO[];
}