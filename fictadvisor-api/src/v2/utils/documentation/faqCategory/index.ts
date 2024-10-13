import { FAQCategoryDocumentationCreate } from './create';
import { FAQCategoryDocumentationUpdate } from './update';
import { FAQCategoryDocumentationGetAll } from './getAll';
import { FAQCategoryDocumentationGet } from './get';
import { FAQCategoryDocumentationDelete } from './delete';

export const FAQCategoryDocumentation = {
  CREATE: FAQCategoryDocumentationCreate,
  GET: FAQCategoryDocumentationGet,
  GET_ALL: FAQCategoryDocumentationGetAll,
  UPDATE: FAQCategoryDocumentationUpdate,
  DELETE: FAQCategoryDocumentationDelete,
};
