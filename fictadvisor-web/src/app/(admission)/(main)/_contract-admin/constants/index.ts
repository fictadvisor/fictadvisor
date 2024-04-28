import { CreateContractDTO } from '@fictadvisor/utils/requests';

import { DropDownOption } from '@/components/common/ui/form/dropdown/types';

export const initialValues: CreateContractDTO = {
  entrant: {
    firstName: '',
    middleName: '',
    lastName: '',
    specialty: '',
  },
  contract: {
    number: '',
    date: '',
  },
};

export const SPECIALITIES: DropDownOption[] = [
  { label: '121 Інженерія програмного забезпечення', id: '121' },
  { label: "123 Комп'ютерна інженерія", id: '123' },
  { label: '126 Інформаційні системи та технології', id: '126' },
];
