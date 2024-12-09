import { ResourceDocumentationCreate } from './create';
import { ResourceDocumentationDelete } from './delete';
import { ResourceDocumentationGet } from './get';
import { ResourceDocumentationGetAll } from './getAll';
import { ResourceDocumentationUpdate } from './update';
import { ResourceDocumentationUpdateMany } from './updateMany';

export const ResourceDocumentation = {
  CREATE: ResourceDocumentationCreate,
  GET: ResourceDocumentationGet,
  GET_ALL: ResourceDocumentationGetAll,
  UPDATE: ResourceDocumentationUpdate,
  UPDATE_MANY: ResourceDocumentationUpdateMany,
  DELETE: ResourceDocumentationDelete,
};
