import {QuestionType, QuestionRole, QuestionAnswer} from '@prisma/client';
export class CreateQuestionsDTO {
    questions: CreateQuestionData[];
}

export class CreateQuestionData {
    type: QuestionType;
    name: string;
    text: string;
    criteria?: string;
    isRequired?: boolean;
}