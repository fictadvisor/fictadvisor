import { TelegramGroupDocumentationDelete } from './delete';
import { TelegramGroupDocumentationUpdate } from './update';
import { TelegramGroupDocumentationCreate } from './create';
import { TelegramGroupDocumentationGetById } from './get-by-id';
import { TelegramGroupDocumentationGetAll } from './get-all';

export const TelegramGroupDocumentation = {
  GET_BY_ID: TelegramGroupDocumentationGetAll,
  GET_ALL: TelegramGroupDocumentationGetById,
  DELETE: TelegramGroupDocumentationDelete,
  UPDATE: TelegramGroupDocumentationUpdate,
  CREATE: TelegramGroupDocumentationCreate,
};
