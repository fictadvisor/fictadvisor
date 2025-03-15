import { DisciplineTypeEnum } from '@prisma/client/fictadvisor';
import { DbQuestion } from './question.entity';

export class DbQuestionRole {
  role: DisciplineTypeEnum;
  question?: DbQuestion;
  questionId: string;
  isShown: boolean;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}
