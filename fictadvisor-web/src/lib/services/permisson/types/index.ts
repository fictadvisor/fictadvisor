import { Group } from '@/types/group';
import { Teacher } from '@/types/teacher';
import { User, UserGroupRole } from '@/types/user';

export enum PERMISSION {
  ADMISSION_GET = 'admission.get',
  ADMISSION_DELETE = 'admission.delete',
  ADMISSION_PRIORITIES_GET = 'admission.priorities.get',
  ADMISSION_PRIORITIES_APPROVE = 'admission.priorities.approve',

  CATHEDRAS_CREATE = 'cathedras.create',

  DISCIPLINE_TEACHERS_CREATE = 'disciplineTeachers.create',
  DISCIPLINE_TEACHERS_UPDATE = 'disciplineTeachers.update',
  DISCIPLINE_TEACHERS_DELETE = 'disciplineTeachers.delete',

  ENTRANT_CONTRACT_CREATE = 'entrant.contract.create',

  GROUPS_CREATE = 'groups.create',
  GROUPS_UPDATE = 'groups.update',
  GROUPS_DELETE = 'groups.delete',
  GROUPS_$GROUPID_ADMIN_SWITCH = 'groups.$groupId.admin.switch',
  GROUPS_$GROUPID_ANSWERS_SEND = 'groups.$groupId.answers.send',
  GROUPS_$GROUPID_CAPTAIN_GET = 'groups.$groupId.captain.get',
  GROUPS_$GROUPID_DISCIPLINES_CREATE = 'groups.$groupId.disciplines.create',
  GROUPS_$GROUPID_DISCIPLINES_GET = 'groups.$groupId.disciplines.get',
  GROUPS_$GROUPID_DISCIPLINES_TEACHERS_GET = 'groups.$groupId.disciplines.teachers.get',
  GROUPS_$GROUPID_DISCIPLINE_TEACHERS_REMOVE = 'groups.$groupId.disciplineTeachers.remove',
  GROUPS_$GROUPID_EVENTS_CREATE = 'groups.$groupId.events.create',
  GROUPS_$GROUPID_EVENTS_GET = 'groups.$groupId.events.get',
  GROUPS_$GROUPID_EVENTS_UPDATE = 'groups.$groupId.events.update',
  GROUPS_$GROUPID_EVENTS_DELETE = 'groups.$groupId.events.delete',
  GROUPS_$GROUPID_QUESTIONS_GET = 'groups.$groupId.questions.get',
  GROUPS_$GROUPID_STUDENTS_ADD = 'groups.$groupId.students.add',
  GROUPS_$GROUPID_STUDENTS_GET = 'groups.$groupId.students.get',
  GROUPS_$GROUPID_STUDENTS_REMOVE = 'groups.$groupId.students.remove',
  GROUPS_$GROUPID_STUDENTS_VERIFY = 'groups.$groupId.students.verify',
  GROUPS_$GROUPID_STUDENTS_UNVERIFIED_GET = 'groups.$groupId.students.unverified.get',
  GROUPS_$GROUPID_TRANSFER = 'groups.$groupId.transfer',
  GROUPS_CAPTAIN_SWITCH = 'groups.captain.switch',
  GROUPS_$GROUPID_LIST_GET = 'groups.$groupId.list.get',
  GROUPS_$GROUPID_LEAVE = 'groups.$groupId.leave',

  QUESTIONS_CREATE = 'questions.create',
  QUESTIONS_UPDATE = 'questions.update',
  QUESTIONS_DELETE = 'questions.delete',
  QUESTIONS_ROLES_GIVE = 'questions.roles.give',
  QUESTIONS_ROLES_DELETE = 'questions.roles.delete',

  RESOURCES_CREATE = 'resources.create',
  RESOURCES_UPDATE = 'resources.update',
  RESOURCES_DELETE = 'resources.delete',

  ROLES_CREATE = 'roles.create',
  ROLES_$ROLEID_UPDATE = 'roles.$roleId.update',
  ROLES_$ROLEID_DELETE = 'roles.$roleId.delete',
  ROLES_$ROLEID_GRANTS_CREATE = 'roles.$roleId.grants.create',

  SCHEDULE_PARSE = 'schedule.parse',

  STUDENTS_DELETE = 'students.delete',

  SUBJECTS_CREATE = 'subjects.create',
  SUBJECTS_UPDATE = 'subjects.update',
  SUBJECTS_DELETE = 'subjects.delete',

  USERS_UPDATE = 'users.update',
  USERS_DELETE = 'users.delete',
  USERS_GROUPS_SWITCH = 'users.groups.switch',
  USERS_$USERID_GET = 'users.$userId.get',
  USERS_$USERID_UPDATE = 'users.$userId.update',
  USERS_$USERID_DELETE = 'users.$userId.delete',
  USERS_$USERID_CONTACTS_CREATE = 'users.$userId.contacts.create',
  USERS_$USERID_CONTACTS_UPDATE = 'users.$userId.contacts.update',
  USERS_$USERID_CONTACTS_GET = 'users.$userId.contacts.get',
  USERS_$USERID_CONTACTS_DELETE = 'users.$userId.contacts.delete',
  USERS_$USERID_GROUP_REQUEST = 'users.$userId.group.request',
  USERS_$USERID_POLL_TEACHERS_GET = 'users.$userId.poll.teachers.get',
  USERS_$USERID_SELECTIVE_GET = 'users.$userId.selective.get',
  USERS_$USERID_SELECTIVE_DISCIPLINES = 'users.$userId.selectiveDisciplines',
  USERS_$USERID_SUPERHERO_CREATE = 'users.$userId.superhero.create',
  USERS_$USERID_STUDENT_UPDATE = 'users.$userId.student.update',
  USERS_$USERID_TELEGRAM_LINK = 'users.$userId.telegram.link',
  USERS_$USERID_TEACHERS_$TEACHERID_DISCIPLINES_GET = 'users.$userId.teachers.$teacherId.disciplines.get',

  TEACHERS_CREATE = 'teachers.create',
  TEACHERS_$TEACHERID_UPDATE = 'teachers.$teacherId.update',
  TEACHERS_$TEACHERID_DELETE = 'teachers.$teacherId.delete',
  TEACHERS_$TEACHERID_CATHEDRAS_UPDATE = 'teachers.$teacherId.cathedras.update',
  TEACHERS_$TEACHERID_CONTACTS_CREATE = 'teachers.$teacherId.contacts.create',
  TEACHERS_$TEACHERID_CONTACTS_UPDATE = 'teachers.$teacherId.contacts.update',
  TEACHERS_$TEACHERID_CONTACTS_DELETE = 'teachers.$teacherId.contacts.delete',
}

export interface PermissionData {
  userId?: User['id'];
  groupId?: Group['id'];
  roleId?: UserGroupRole;
  teacherId?: Teacher['id'];
}

export type PermissionResponse = {
  [key in PERMISSION]: boolean;
};
