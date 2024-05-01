import { DisciplineResourceDocumentationCreate } from './create';
import { DisciplineResourceDocumentationDeleteById } from './deleteById';
import { DisciplineResourceDocumentationGetAll } from './getAll';
import { DisciplineResourceDocumentationUpdateById } from './updateById';

export const DisciplineResourceDocumentation = {
  CREATE: DisciplineResourceDocumentationCreate,
  DELETE_BY_ID: DisciplineResourceDocumentationDeleteById,
  GET_ALL: DisciplineResourceDocumentationGetAll,
  UPDATE_BY_ID: DisciplineResourceDocumentationUpdateById,
};