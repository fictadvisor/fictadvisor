import { DisciplineTypeEnum, TeacherRole } from '@prisma/client';

export const TeacherRoleAdapter: {[key in keyof typeof DisciplineTypeEnum]?: TeacherRole | never} = {
  [DisciplineTypeEnum.LECTURE]: TeacherRole.LECTURER,
  [DisciplineTypeEnum.PRACTICE]: TeacherRole.PRACTICIAN,
  [DisciplineTypeEnum.LABORATORY]: TeacherRole.LABORANT,
  [DisciplineTypeEnum.EXAM]: TeacherRole.EXAMINER,
  [DisciplineTypeEnum.CONSULTATION]: TeacherRole.OTHER,
  [DisciplineTypeEnum.WORKOUT]: TeacherRole.OTHER,
};

export const TeacherTypeAdapter: {[key in keyof typeof TeacherRole]?: DisciplineTypeEnum | never} = {
  [TeacherRole.LECTURER]: DisciplineTypeEnum.LECTURE,
  [TeacherRole.PRACTICIAN]: DisciplineTypeEnum.PRACTICE,
  [TeacherRole.LABORANT]: DisciplineTypeEnum.LABORATORY,
  [TeacherRole.EXAMINER]: DisciplineTypeEnum.EXAM,
};