import { EntrantBody } from '@/types/contract';

export interface ContractAdminBody {
  number: string;
  date: string;
}

export interface AdminContractBody {
  entrant: EntrantBody;
  contract: ContractAdminBody;
}
