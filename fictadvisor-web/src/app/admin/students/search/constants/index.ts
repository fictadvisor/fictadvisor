import { StudentSearchFormFields } from '@/app/admin/students/common/types';
import { CheckboxOption } from '@/components/common/ui/form/checkboxes-dropdown/types/CheckboxOption';
import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import { TagColor } from '@/components/common/ui/tag/types';
import { UserGroupRole } from '@/types/user';

export const sortOptions: DropDownOption[] = [
  { id: 'firstName', label: "За ім'ям" },
  { id: 'middleName', label: 'По-батькові' },
  { id: 'lastName', label: 'За прізвищем' },
];
export const roleOptions: CheckboxOption[] = [
  { value: UserGroupRole.CAPTAIN, label: 'Староста' },
  { value: UserGroupRole.MODERATOR, label: 'Заст. старости' },
  { value: UserGroupRole.STUDENT, label: 'Студент' },
];

export const StudentInitialValues: StudentSearchFormFields = {
  search: '',
  order: 'asc',
  sort: 'firstName',
  groups: [],
  roles: [],
};

export const TagColorMapper: Record<string, TagColor> = {
  CAPTAIN: TagColor.ORANGE,
  MODERATOR: TagColor.PRIMARY,
  STUDENT: TagColor.SUCCESS,
  NULL: TagColor.SECONDARY,
};
export const TagTextMapper: Record<string, string> = {
  CAPTAIN: 'Староста',
  MODERATOR: 'Заст. старости',
  STUDENT: 'Студент',
  NULL: 'Немає',
};
