import { Fullname } from '@/types/contract';

export interface ContractAdminBody {
  number: string;
  date: string;
}

export interface AdminContractBody {
  entrant: Fullname;
  contract: ContractAdminBody;
}
