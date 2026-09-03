import { SelectiveFileDocumentationGetAll } from './get-all';
import { SelectiveFileDocumentationUpload } from './upload';
import { SelectiveFileDocumentationDelete } from './delete';
import { SelectiveFileDocumentationParse } from './parse';


export const SelectiveFileDocumentation = {
  GET_ALL: SelectiveFileDocumentationGetAll,
  UPLOAD: SelectiveFileDocumentationUpload,
  DELETE: SelectiveFileDocumentationDelete,
  PARSE: SelectiveFileDocumentationParse,
};
