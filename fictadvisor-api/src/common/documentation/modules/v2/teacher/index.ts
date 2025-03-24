import { TeacherDocumentationConnectCathedra } from './connect-cathedra';
import { TeacherDocumentationCreate } from './create';
import { TeacherDocumentationCreateContact } from './create-contact';
import { TeacherDocumentationDelete } from './delete';
import { TeacherDocumentationDeleteContact } from './delete-contact';
import { TeacherDocumentationDisconnectCathedra } from './disconnect-cathedra';
import { TeacherDocumentationGetAll } from './get-all';
import { TeacherDocumentationGetAllContacts } from './get-all-contacts';
import { TeacherDocumentationGetComments } from './get-comments';
import { TeacherDocumentationGetContact } from './get-contact';
import { TeacherDocumentationGetDisciplines } from './get-disciplines';
import { TeacherDocumentationGetMarks } from './get-marks';
import { TeacherDocumentationGetSubject } from './get-subject';
import { TeacherDocumentationGetSubjects } from './get-subjects';
import { TeacherDocumentationGetTeacher } from './get-teacher';
import { TeacherDocumentationGetTeacherRoles } from './get-teacher-roles';
import { TeacherDocumentationSendComplaint } from './send-complaint';
import { TeacherDocumentationUpdate } from './update';
import { TeacherDocumentationUpdateContact } from './update-contact';

export const TeacherDocumentation = {
  CONNECT_CATHEDRA: TeacherDocumentationConnectCathedra,
  CREATE: TeacherDocumentationCreate,
  CREATE_CONTACT: TeacherDocumentationCreateContact,
  DELETE: TeacherDocumentationDelete,
  DELETE_CONTACT: TeacherDocumentationDeleteContact,
  DISCONNECT_CATHEDRA: TeacherDocumentationDisconnectCathedra,
  GET_ALL: TeacherDocumentationGetAll,
  GET_ALL_CONTACTS: TeacherDocumentationGetAllContacts,
  GET_COMMENTS: TeacherDocumentationGetComments,
  GET_CONTACT: TeacherDocumentationGetContact,
  GET_DISCIPLINES: TeacherDocumentationGetDisciplines,
  GET_MARKS: TeacherDocumentationGetMarks,
  GET_SUBJECT: TeacherDocumentationGetSubject,
  GET_SUBJECTS: TeacherDocumentationGetSubjects,
  GET_TEACHER: TeacherDocumentationGetTeacher,
  GET_TEACHER_ROLES: TeacherDocumentationGetTeacherRoles,
  SEND_COMPLAINT: TeacherDocumentationSendComplaint,
  UPDATE: TeacherDocumentationUpdate,
  UPDATE_CONTACT: TeacherDocumentationUpdateContact,
};
