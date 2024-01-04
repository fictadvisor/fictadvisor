import { Teacher } from '@/types/teacher';

export interface TeacherWithDisciplineId extends Omit<Teacher, 'contacts'> {
  disciplineTeacherId: string;
}
export interface GetDisciplineWithTeachers {
  id: string;
  subject: {
    id: string;
    name: string;
  };
  year: number;
  semester: number;
  isSelective: boolean;
  teachers: TeacherWithDisciplineId[];
}

export type GetDisciplinesWithTeachers = GetDisciplineWithTeachers[];
