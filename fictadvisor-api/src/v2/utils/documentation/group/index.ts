import { GroupDocumentationAddEmails } from './addEmails';
import { GroupDocumentationCreate } from './create';
import { GroupDocumentationDelete } from './delete';
import { GroupDocumentationGet } from './get';
import { GroupDocumentationGetAll } from './getAll';
import { GroupDocumentationGetCaptain } from './getCaptain';
import { GroupDocumentationGetDisciplineTeachers } from './getDisciplineTeachers';
import { GroupDocumentationGetDisciplines } from './getDisciplines';
import { GroupDocumentationGetGroupList } from './getGroupList';
import { GroupDocumentationGetGroupsWithTelegramGroups } from './getGroupsWithTelegramGroups';
import { GroupDocumentationGetSelectives } from './getSelectives';
import { GroupDocumentationGetStudents } from './getStudents';
import { GroupDocumentationGetUnverifiedStudents } from './getUnverifiedStudents';
import { GroupDocumentationLeaveGroup } from './leaveGroup';
import { GroupDocumentationRemoveStudent } from './removeStudent';
import { GroupDocumentationSwitchCaptain } from './switchCaptain';
import { GroupDocumentationSwitchRole } from './switchRole';
import { GroupDocumentationUpdate } from './update';
import { GroupDocumentationVerifyStudent } from './verifyStudent';

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
