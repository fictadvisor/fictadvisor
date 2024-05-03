import { DropDownOption } from '@/components/common/ui/form/dropdown/types';
import {
  DeleteEntrantBody,
  EntrantDeleteOptions,
} from '@/lib/api/contract/types/DeleteEntrantBody';

export const initialValues: DeleteEntrantBody = {
  firstName: '',
  lastName: '',
  middleName: '',

  action: EntrantDeleteOptions.CONTRACT,
};
export const EntrantActionsOptions: DropDownOption[] = [
  {
    label: 'Видалити абітурієнта',
    id: EntrantDeleteOptions.ENTRANT,
  },
  {
    label: 'Видалити пріоритет',
    id: EntrantDeleteOptions.PRIORITY,
  },
  {
    label: 'Видалити договір',
    id: EntrantDeleteOptions.CONTRACT,
  },
];
