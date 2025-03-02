import { UserDocumentationCreateUser } from './createUser';
import { UserDocumentationVerify } from './verify';
import { UserDocumentationVerifySuperhero } from './verifySuperhero';
import { UserDocumentationRequestNewGroup } from './requestNewGroup';
import { UserDocumentationCreateSuperhero } from './createSuperhero';
import { UserDocumentationGetSelectiveDisciplines } from './getSelectiveDisciplines';
import { UserDocumentationGetSelectivesBySemesters } from './getSelectivesBySemesters';
import { UserDocumentationGiveRole } from './giveRole';
import { UserDocumentationRemoveRole } from './removeRole';
import { UserDocumentationGetAll } from './getAll';
import { UserDocumentationDeleteUser } from './deleteUser';
import { UserDocumentationUpdateUser } from './updateUser';
import { UserDocumentationGetContacts } from './getContacts';
import { UserDocumentationCreateContact } from './createContact';
import { UserDocumentationUpdateContact } from './updateContact';
import { UserDocumentationDeleteContact } from './deleteContact';
import { UserDocumentationUpdateStudent } from './updateStudent';
import { UserDocumentationGetUserForTelegram } from './getUserForTelegram';
import { UserDocumentationGetUserByTelegramId } from './getUserByTelegramId';
import { UserDocumentationLinkTelegram } from './linkTelegram';
import { UserDocumentationGetMe } from './getMe';
import { UserDocumentationUploadAvatar } from './uploadAvatar';
import { UserDocumentationDeleteAvatar } from './deleteAvatar';
import { UserDocumentationGetRemainingSelectives } from './getRemainingSelectives';
import { UserDocumentationAttachSelectiveDisciplines } from './attachSelectiveDisciplines';
import { UserDocumentationDetachSelectiveDisciplines } from './detachSelectiveDisciplines';
import { UserDocumentationChangeGroup } from './changeGroup';

export const UserDocumentation = {
  CREATE_USER: UserDocumentationCreateUser,
  VERIFY: UserDocumentationVerify,
  VERIFY_SUPERHERO: UserDocumentationVerifySuperhero,
  REQUEST_NEW_GROUP: UserDocumentationRequestNewGroup,
  CREATE_SUPERHERO: UserDocumentationCreateSuperhero,
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
