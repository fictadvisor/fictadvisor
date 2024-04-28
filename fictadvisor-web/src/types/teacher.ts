import { QuestionDisplay, TeacherRole } from '@fictadvisor/utils/enums';
import {
  CathedraResponse,
  ContactResponse,
} from '@fictadvisor/utils/responses';

export interface TeacherCathedra {
  id: string;
  name: string;
  abbreviation: string;
}

export interface TeacherSubject {
  id: string;
  name: string;
}

export class Teacher {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  avatar: string;
  description: string;
  rating: number;
  roles: TeacherRole[];
  contacts: ContactResponse[];
  cathedras: CathedraResponse[];
}

export interface DisciplineTeacher extends Teacher {
  disciplineTeacherId: string;
  subject: TeacherSubject;
}

export interface TeacherAmountMark {
  name: string;
  amount: number;
  type: QuestionDisplay.AMOUNT;
  mark: {
    [key: number]: number;
  };
}

export interface TeacherRadarCircleMark {
  name: string;
  amount: number;
  type: QuestionDisplay.RADAR | QuestionDisplay.CIRCLE;
  mark: number;
}

export interface TeacherComment {
  discipline: string;
  semester: 1 | 2;
  year: number;
  comment: string;
}

export interface TeacherQuestion {
  name: string;
  amount: number;
  comments: TeacherComment[];
}
