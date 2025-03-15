import { ResourceDocumentationCreate } from './create';
import { ResourceDocumentationDelete } from './delete';
import { ResourceDocumentationGet } from './get';
import { ResourceDocumentationGetAll } from './get-all';
import { ResourceDocumentationUpdate } from './update';
import { ResourceDocumentationUpdateMany } from './update-many';

export const ResourceDocumentation = {
  CREATE: ResourceDocumentationCreate,
  GET: ResourceDocumentationGet,
  GET_ALL: ResourceDocumentationGetAll,
  UPDATE: ResourceDocumentationUpdate,
  UPDATE_MANY: ResourceDocumentationUpdateMany,
  DELETE: ResourceDocumentationDelete,
};
