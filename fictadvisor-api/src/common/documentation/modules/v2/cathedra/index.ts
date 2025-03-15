import { CathedraDocumentationUpdate } from './update';
import { CathedraDocumentationGetById } from './get-by-id';
import { CathedraDocumentationGetAllDivisions } from './get-all-divisions';
import { CathedraDocumentationGetAll } from './get-all';
import { CathedraDocumentationDelete } from './delete';
import { CathedraDocumentationCreate } from './create';

export const CathedraDocumentation = {
  CREATE: CathedraDocumentationCreate,
  DELETE: CathedraDocumentationDelete,
  GET_ALL: CathedraDocumentationGetAll,
  GET_ALL_DIVISIONS: CathedraDocumentationGetAllDivisions,
  GET_BY_ID: CathedraDocumentationGetById,
  UPDATE: CathedraDocumentationUpdate,
};
