import { QuestionType } from '@prisma/client';
export class UpdateQuestionDTO{
    text?: string;
    name?: string;
    criteria?: string;
    type?: QuestionType;
}