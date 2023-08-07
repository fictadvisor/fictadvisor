import { Fullname } from '@/types/contract';

interface ContractAdminBody {
  number: string;
  date: string;
}

export interface AdminContractBody {
  entrant: Fullname;
  contract: ContractAdminBody;
}
