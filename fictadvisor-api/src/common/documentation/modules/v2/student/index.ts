import { StudentDocumentationCreateStudent } from './createStudent';
import { StudentDocumentationDeleteStudent } from './deleteStudent';
import { StudentDocumentationGetAll } from './getAll';
import { StudentDocumentationGetRemainingSelectives } from './getRemainingSelectives';
import { StudentDocumentationGetSelcetiveDisciplines } from './getSelectiveDisciplines';
import { StudentDocumentationGetStudent } from './getStudent';
import { StudentDocumentationUpdateStudent } from './updateStudent';
import { StudentDocumentationUpdateStudentSelectives } from './updateStudentSelectives';

export const StudentDocumentation = {
  CREATE_STUDENT: StudentDocumentationCreateStudent,
  DELETE_STUDENT: StudentDocumentationDeleteStudent,
  GET_ALL: StudentDocumentationGetAll,
  GET_REMAINING_SELECTIVES: StudentDocumentationGetRemainingSelectives,
  GET_SELECTIVE_DISCIPLINES: StudentDocumentationGetSelcetiveDisciplines,
  GET_STUDENT: StudentDocumentationGetStudent,
  UPDATE_STUDENT: StudentDocumentationUpdateStudent,
  UPDATE_STUDENT_SELECTIVES: StudentDocumentationUpdateStudentSelectives,
};