import { GroupRoles } from '@fictadvisor/utils/enums';
import { OrdinaryStudentResponse } from '@fictadvisor/utils/responses';

export const extractModeratorsIds = (
  students: OrdinaryStudentResponse[],
): string[] => {
  return students
    .filter(student => {
      return student.group.role === GroupRoles.MODERATOR;
    })
    .map(student => student.id);
};
