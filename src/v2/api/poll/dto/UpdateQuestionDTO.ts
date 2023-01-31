import { QuestionType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateQuestionDTO {
    @IsOptional()
    text?: string;

    @IsOptional()
    name?: string;

    @IsOptional()
    criteria?: string;

    @IsEnum(QuestionType)
    @IsOptional()
    type?: QuestionType;
}