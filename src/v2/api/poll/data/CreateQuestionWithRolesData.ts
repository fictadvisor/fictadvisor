import { QuestionType } from '@prisma/client';
import { CreateQuestionRoleData } from './CreateQuestionRoleData';

export class CreateQuestionData {
  category: string;
  type: QuestionType;
  name: string;
  text: string;
  criteria?: string;
  description?: string;
  isRequired?: boolean;
}

export class CreateQuestionWithRolesData extends CreateQuestionData {
  roles: CreateQuestionRoleData[];
}