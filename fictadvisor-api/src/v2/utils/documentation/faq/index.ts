import { FAQDocumentationCreate } from './create';
import { FAQDocumentationUpdate } from './update';
import { FAQDocumentationDelete } from './delete';
import { FAQDocumentationGet } from './get';
import { FAQDocumentationGetAll } from './getAll';

export const FAQDocumentation = {
  CREATE: FAQDocumentationCreate,
  GET: FAQDocumentationGet,
  GET_ALL: FAQDocumentationGetAll,
  UPDATE: FAQDocumentationUpdate,
  DELETE: FAQDocumentationDelete,
};