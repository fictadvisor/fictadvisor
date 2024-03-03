import { TeacherRole } from '@/types/teacher';

export default interface AddDisciplineTeacher {
  roles: TeacherRole[];
  teacherId: string;
  disciplineId: string;
}
