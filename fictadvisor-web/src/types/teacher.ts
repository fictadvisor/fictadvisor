import { DisciplineTypeEnum, QuestionDisplay } from '@fictadvisor/utils/enums';
import {
  CathedraResponse,
  ContactResponse,
} from '@fictadvisor/utils/responses';

import { Contact } from '@/types/contact';

export interface TeacherCathedra {
  id: string;
  name: string;
  abbreviation: string;
}

export interface TeacherSubject {
  id: string;
  name: string;
}

export interface TeacherDiscipline {
  disciplineTeacherId: string;
  subjectName: string;
}

export const TeacherAcademicStatus: Record<string, string> = {
  DOCENT: 'Доцент',
  PROFESSOR: 'Професор',
  SENIOR_RESEARCH_ASSISTANT: 'Старший науковий співробітник',
};

export const TeacherScientificDegree: Record<string, string> = {
  CANDIDATE: 'Кандидат наук',
  DOCTOR: 'Доктор наук',
};

export const TeacherPosition: Record<string, string> = {
  ASSOCIATE_PROFESSOR: 'Доцент',
  DEPARTMENT_CHAIR: 'Завідуючий кафедрою',
  PROFESSOR: 'Професор',
  RESEARCH_ASSISTANT: 'Молодший науковий співробітник',
  SENIOR_RESEARCH_ASSISTANT: 'Старший науковий співробітник',
  SENIOR_LECTURER: 'Старший викладач',
  ASSISTANT: 'Асистент',
  LEADING_RESEARCHER: 'Провідний науковий співробітник',
  LECTURER: 'Лектор',
};

export interface Teacher {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  avatar: string;
  description: string;
  rating: number;
  disciplineTypes: DisciplineTypeEnum[];
  contacts: Contact[];
  cathedras: TeacherCathedra[];
  academicStatus: string;
  scientificDegree: string;
  position: string;
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
