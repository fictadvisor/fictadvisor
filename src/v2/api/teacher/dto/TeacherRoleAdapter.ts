import { DisciplineTypeEnum, TeacherRole } from '@prisma/client';

export const TeacherRoleAdapter: {[key in keyof typeof DisciplineTypeEnum]?: TeacherRole | never} = {
  [DisciplineTypeEnum.LECTURE]: TeacherRole.LECTURER,
  [DisciplineTypeEnum.PRACTICE]: TeacherRole.PRACTICIAN,
  [DisciplineTypeEnum.LABORATORY]: TeacherRole.LABORANT,
}