import { CathedraDocumentationUpdate } from './update';
import { CathedraDocumentationGetById } from './getById';
import { CathedraDocumentationGetAllDivisions } from './getAllDivisions';
import { CathedraDocumentationGetAll } from './getAll';
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
