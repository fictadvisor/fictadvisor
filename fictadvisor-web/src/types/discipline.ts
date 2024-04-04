import { Teacher } from './teacher';

export interface Discipline {
  id: string;
  year: number;
  isSelective: boolean;
  semester: number;
  subject: {
    id: string;
    name: string;
  };
}

export interface AdminDiscipline {
  id: string;
  year: number;
  isSelective: boolean;
  semester: number;
  subject: {
    id: string;
    name: string;
  };
  group: {
    id: string;
    code: string;
  };
  teachers: DisciplineTeacher[];
}

interface DisciplineTeacher extends Omit<Teacher, 'contacts'> {
  disciplineTeacherId: string;
}
