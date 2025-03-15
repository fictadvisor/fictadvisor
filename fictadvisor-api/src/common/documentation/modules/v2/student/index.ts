import { StudentDocumentationCreateStudent } from './create-student';
import { StudentDocumentationDeleteStudent } from './delete-student';
import { StudentDocumentationGetAll } from './get-all';
import { StudentDocumentationGetRemainingSelectives } from './get-remaining-selectives';
import { StudentDocumentationGetSelcetiveDisciplines } from './get-selective-disciplines';
import { StudentDocumentationGetStudent } from './get-student';
import { StudentDocumentationUpdateStudent } from './update-student';
import { StudentDocumentationUpdateStudentSelectives } from './update-student-selectives';

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
