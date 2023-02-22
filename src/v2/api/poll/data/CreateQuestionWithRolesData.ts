import { QuestionType, TeacherRole } from '@prisma/client';

export class CreateQuestionData {
  category: string;
  type: QuestionType;
  name: string;
  text: string;
  criteria?: string;
  description?: string;
  isRequired?: boolean;
}

export class CreateQuestionRoleData {
  role: TeacherRole;
  isShown: boolean;
  isRequired: boolean;
}

export class CreateQuestionWithRolesData extends CreateQuestionData {
  roles: CreateQuestionRoleData[];
}