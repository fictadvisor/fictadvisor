import { RoleDocumentationGetAll } from './getAll';
import { RoleDocumentationGet } from './get';
import { RoleDocumentationCreateWithGrants } from './createWithGrants';
import { RoleDocumentationCreate } from './create';
import { RoleDocumentationUpdate } from './update';
import { RoleDocumentationDelete } from './delete';
import { RoleDocumentationGetAllGrants } from './getAllGrants';
import { RoleDocumentationGetGrant } from './getGrant';
import { RoleDocumentationCreateGrant } from './createGrant';
import { RoleDocumentationCreateGrants } from './createGrants';
import { RoleDocumentationDeleteGrant } from './deleteGrant';
import { RoleDocumentationUpdateGrant } from './updateGrant';


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
