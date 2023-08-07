import { AdminContractBody } from '@/lib/api/contract/types/AdminContractBody';

export const initialValues: AdminContractBody = {
  entrant: {
    firstName: '',
    middleName: '',
    lastName: '',
  },
  contract: {
    number: '',
    date: '',
  },
};
