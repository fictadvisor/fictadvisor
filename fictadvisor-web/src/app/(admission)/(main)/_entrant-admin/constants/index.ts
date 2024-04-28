import { EntrantActions } from '@fictadvisor/utils/enums';
import { DeleteEntrantDataQueryDTO } from '@fictadvisor/utils/requests';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const initialValues: DeleteEntrantDataQueryDTO = {
  firstName: '',
  lastName: '',
  middleName: '',
  specialty: '',
  action: EntrantActions.CONTRACT,
};
export const EntrantActionsOptions: DropDownOption[] = [
  {
    label: 'Видалити абітурієнта',
    id: EntrantActions.ENTRANT,
  },
  {
    label: 'Видалити пріоритет',
    id: EntrantActions.PRIORITY,
  },
  {
    label: 'Видалити договір',
    id: EntrantActions.CONTRACT,
  },
];
