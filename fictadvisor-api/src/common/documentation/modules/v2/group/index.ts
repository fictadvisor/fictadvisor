import { GroupDocumentationAddEmails } from './add-emails';
import { GroupDocumentationCreate } from './create';
import { GroupDocumentationDelete } from './delete';
import { GroupDocumentationGet } from './get';
import { GroupDocumentationGetAll } from './get-all';
import { GroupDocumentationGetCaptain } from './get-captain';
import { GroupDocumentationGetDisciplineTeachers } from './get-discipline-teachers';
import { GroupDocumentationGetDisciplines } from './get-disciplines';
import { GroupDocumentationGetGroupList } from './get-group-list';
import { GroupDocumentationGetGroupsWithTelegramGroups } from './get-groups-with-telegram-groups';
import { GroupDocumentationGetSelectives } from './get-selectives';
import { GroupDocumentationGetStudents } from './get-students';
import { GroupDocumentationGetUnverifiedStudents } from './get-unverified-students';
import { GroupDocumentationLeaveGroup } from './leave-group';
import { GroupDocumentationRemoveStudent } from './remove-student';
import { GroupDocumentationSwitchCaptain } from './switch-captain';
import { GroupDocumentationSwitchRole } from './switch-role';
import { GroupDocumentationUpdate } from './update';
import { GroupDocumentationVerifyStudent } from './verify-student';

export const GroupDocumentation = {
  ADD_EMAILS: GroupDocumentationAddEmails,
  CREATE: GroupDocumentationCreate,
  DELETE: GroupDocumentationDelete,
  GET: GroupDocumentationGet,
  GET_ALL: GroupDocumentationGetAll,
  GET_CAPTAIN: GroupDocumentationGetCaptain,
  GET_DISCIPLINE_TEACHER: GroupDocumentationGetDisciplineTeachers,
  GET_DISCIPLINES: GroupDocumentationGetDisciplines,
  GET_GROUP_LIST: GroupDocumentationGetGroupList,
  GET_GROUPS_WITH_TELEGRAM_GROUPS: GroupDocumentationGetGroupsWithTelegramGroups,
  GET_SELECTIVES: GroupDocumentationGetSelectives,
  GET_STUDENTS: GroupDocumentationGetStudents,
  GET_UNVERIFIED_STUDENTS: GroupDocumentationGetUnverifiedStudents,
  LEAVE_GROUP: GroupDocumentationLeaveGroup,
  REMOVE_STUDENT: GroupDocumentationRemoveStudent,
  SWITCH_CAPTAIN: GroupDocumentationSwitchCaptain,
  SWITCH_ROLE: GroupDocumentationSwitchRole,
  UPDATE: GroupDocumentationUpdate,
  VERIFY_STUDENT: GroupDocumentationVerifyStudent,
};
