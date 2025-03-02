import { TeacherDocumentationConnectCathedra } from './connectCathedra';
import { TeacherDocumentationCreate } from './create';
import { TeacherDocumentationCreateContact } from './createContact';
import { TeacherDocumentationDelete } from './delete';
import { TeacherDocumentationDeleteContact } from './deleteContact';
import { TeacherDocumentationDisconnectCathedra } from './disconnectCathedra';
import { TeacherDocumentationGetAll } from './getAll';
import { TeacherDocumentationGetAllContacts } from './getAllContacts';
import { TeacherDocumentationGetComments } from './getComments';
import { TeacherDocumentationGetContact } from './getContact';
import { TeacherDocumentationGetDisciplines } from './getDisciplines';
import { TeacherDocumentationGetMarks } from './getMarks';
import { TeacherDocumentationGetSubject } from './getSubject';
import { TeacherDocumentationGetSubjects } from './getSubjects';
import { TeacherDocumentationGetTeacher } from './getTeacher';
import { TeacherDocumentationGetTeacherRoles } from './getTeacherRoles';
import { TeacherDocumentationSendComplaint } from './sendComplaint';
import { TeacherDocumentationUpdate } from './update';
import { TeacherDocumentationUpdateContact } from './updateContact';

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