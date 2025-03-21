import { RoleDocumentationGetAll } from './get-all';
import { RoleDocumentationGet } from './get';
import { RoleDocumentationCreateWithGrants } from './create-with-grants';
import { RoleDocumentationCreate } from './create';
import { RoleDocumentationUpdate } from './update';
import { RoleDocumentationDelete } from './delete';
import { RoleDocumentationGetAllGrants } from './get-all-grants';
import { RoleDocumentationGetGrant } from './get-grant';
import { RoleDocumentationCreateGrant } from './create-grant';
import { RoleDocumentationCreateGrants } from './create-grants';
import { RoleDocumentationDeleteGrant } from './delete-grant';
import { RoleDocumentationUpdateGrant } from './update-grant';


export const RoleDocumentation = {
  GET_ALL: RoleDocumentationGetAll,
  GET: RoleDocumentationGet,
  CREATE_WITH_GRANTS: RoleDocumentationCreateWithGrants,
  CREATE: RoleDocumentationCreate,
  UPDATE: RoleDocumentationUpdate,
  DELETE: RoleDocumentationDelete,
  GET_ALL_GRANTS: RoleDocumentationGetAllGrants,
  GET_GRANT: RoleDocumentationGetGrant,
  CREATE_GRANT: RoleDocumentationCreateGrant,
  CREATE_GRANTS: RoleDocumentationCreateGrants,
  UPDATE_GRANT: RoleDocumentationUpdateGrant,
  DELETE_GRANT: RoleDocumentationDeleteGrant,
};
