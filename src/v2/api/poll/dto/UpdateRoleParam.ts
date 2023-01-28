import {IsIn, IsNotEmpty} from "class-validator";
import {TeacherRole} from "@prisma/client";

export class UpdateRoleParam {
  @IsNotEmpty()
  questionId: string;

  @IsIn(Object.keys(TeacherRole))
  role: TeacherRole;
}