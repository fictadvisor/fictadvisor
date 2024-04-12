import { GroupStudent } from '@/types/student';
import { UserGroupRole } from '@/types/user';

export const extractModeratorsIds = (students: GroupStudent[]): string[] => {
  return students
    .filter(student => {
      return student.group.role === UserGroupRole.MODERATOR;
    })
    .map(student => student.id);
};
