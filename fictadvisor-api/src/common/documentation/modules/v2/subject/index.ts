import { SubjectDocumentationGetAll } from './get-all';
import { SubjectDocumentationGet } from './get';
import { SubjectDocumentationCreate } from './create';
import { SubjectDocumentationGetTeachers } from './get-teachers';
import { SubjectDocumentationUpdate } from './update';
import { SubjectDocumentationDelete } from './delete';

export const SubjectDocumentation = {
  GET_ALL: SubjectDocumentationGetAll,
  GET: SubjectDocumentationGet,
  GET_TEACHERS: SubjectDocumentationGetTeachers,
  CREATE: SubjectDocumentationCreate,
  UPDATE: SubjectDocumentationUpdate,
  DELETE: SubjectDocumentationDelete,
};
