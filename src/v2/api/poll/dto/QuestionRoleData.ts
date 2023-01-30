import { TeacherRole } from "@prisma/client";

export class QuestionRoleData {
    role: TeacherRole;
    questionId?: string;
    isShown: boolean;
    isRequired: boolean;
}