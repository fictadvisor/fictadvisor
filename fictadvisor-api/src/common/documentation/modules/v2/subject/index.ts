import { SubjectDocumentationGetAll } from './getAll';
import { SubjectDocumentationGet } from './get';
import { SubjectDocumentationCreate } from './create';
import { SubjectDocumentationGetTeachers } from './getTeachers';
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
