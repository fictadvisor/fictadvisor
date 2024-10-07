import { PERMISSION } from '@fictadvisor/utils';

export const adminPermissions = {
  '/admin/roles': PERMISSION.ADMIN_PANEL_ROLES_SHOW,
  '/admin/users': PERMISSION.ADMIN_PANEL_USERS_SHOW,
  '/admin/students': PERMISSION.ADMIN_PANEL_STUDENTS_SHOW,
  '/admin/groups': PERMISSION.ADMIN_PANEL_GROUPS_SHOW,
  '/admin/departments': PERMISSION.ADMIN_PANEL_DEPARTMENTS_SHOW,
  '/admin/teachers': PERMISSION.ADMIN_PANEL_TEACHERS_SHOW,
  '/admin/disciplines': PERMISSION.ADMIN_PANEL_DISCIPLINES_SHOW,
  '/admin/subjects': PERMISSION.ADMIN_PANEL_SUBJECTS_SHOW,
  '/admin/main': PERMISSION.ADMIN_PANEL_MAIN_SHOW,
  '/admin/questions': PERMISSION.ADMIN_PANEL_QUESTIONS_SHOW,
  '/admin/comments': PERMISSION.ADMIN_PANEL_COMMENTS_SHOW,
};
