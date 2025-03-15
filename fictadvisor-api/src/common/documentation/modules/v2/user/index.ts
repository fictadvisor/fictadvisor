import { UserDocumentationCreateUser } from './create-user';
import { UserDocumentationVerify } from './verify';
import { UserDocumentationRequestNewGroup } from './request-new-group';
import { UserDocumentationGetSelectiveDisciplines } from './get-selective-disciplines';
import { UserDocumentationGetSelectivesBySemesters } from './get-selectives-by-semesters';
import { UserDocumentationGiveRole } from './give-role';
import { UserDocumentationRemoveRole } from './remove-role';
import { UserDocumentationGetAll } from './get-all';
import { UserDocumentationDeleteUser } from './delete-user';
import { UserDocumentationUpdateUser } from './update-user';
import { UserDocumentationGetContacts } from './get-contacts';
import { UserDocumentationCreateContact } from './create-contact';
import { UserDocumentationUpdateContact } from './update-contact';
import { UserDocumentationDeleteContact } from './delete-contact';
import { UserDocumentationUpdateStudent } from './update-student';
import { UserDocumentationGetUserForTelegram } from './get-user-for-telegram';
import { UserDocumentationGetUserByTelegramId } from './get-user-by-telegram-id';
import { UserDocumentationLinkTelegram } from './link-telegram';
import { UserDocumentationGetMe } from './get-me';
import { UserDocumentationUploadAvatar } from './upload-avatar';
import { UserDocumentationDeleteAvatar } from './delete-avatar';
import { UserDocumentationGetRemainingSelectives } from './get-remaining-selectives';
import { UserDocumentationAttachSelectiveDisciplines } from './attach-selective-disciplines';
import { UserDocumentationDetachSelectiveDisciplines } from './detach-selective-disciplines';
import { UserDocumentationChangeGroup } from './change-group';

export const UserDocumentation = {
  CREATE_USER: UserDocumentationCreateUser,
  VERIFY: UserDocumentationVerify,
  REQUEST_NEW_GROUP: UserDocumentationRequestNewGroup,
  GET_SELECTIVE_DISCIPLINES: UserDocumentationGetSelectiveDisciplines,
  GET_SELECTIVES_BY_SEMESTERS: UserDocumentationGetSelectivesBySemesters,
  GIVE_ROLE: UserDocumentationGiveRole,
  REMOVE_ROLE: UserDocumentationRemoveRole,
  GET_ALL: UserDocumentationGetAll,
  DELETE_USER: UserDocumentationDeleteUser,
  UPDATE_USER: UserDocumentationUpdateUser,
  GET_CONTACTS: UserDocumentationGetContacts,
  CREATE_CONTACT: UserDocumentationCreateContact,
  UPDATE_CONTACT: UserDocumentationUpdateContact,
  DELETE_CONTACT: UserDocumentationDeleteContact,
  UPDATE_STUDENT: UserDocumentationUpdateStudent,
  GET_USER_FOR_TELEGRAM: UserDocumentationGetUserForTelegram,
  GET_USER_BY_TELEGRAM_ID: UserDocumentationGetUserByTelegramId,
  LINK_TELEGRAM: UserDocumentationLinkTelegram,
  GET_ME: UserDocumentationGetMe,
  UPLOAD_AVATAR: UserDocumentationUploadAvatar,
  DELETE_AVATAR: UserDocumentationDeleteAvatar,
  GET_REMAINING_SELECTIVES: UserDocumentationGetRemainingSelectives,
  ATTACH_SELECTIVE_DISCIPLINES: UserDocumentationAttachSelectiveDisciplines,
  DETACH_SELECTIVE_DISCIPLINES: UserDocumentationDetachSelectiveDisciplines,
  CHANGE_GROUP: UserDocumentationChangeGroup,
};
