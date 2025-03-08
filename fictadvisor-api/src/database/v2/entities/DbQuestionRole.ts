import { DbQuestion } from './DbQuestion';
import { DisciplineTypeEnum } from '@prisma/client/fictadvisor';

export class DbQuestionRole {
  role: DisciplineTypeEnum;
  question?: DbQuestion;
  questionId: string;
  isShown: boolean;
  isRequired: boolean;
  createdAt: Date;
  updatedAt: Date;
}
