interface PersonalAdminBody {
  firstName: string;
  middleName: string;
  lastName: string;
}

interface ContractAdminBody {
  number: string;
  date: string;
}

export interface AdminContractBody {
  entrant: PersonalAdminBody;
  contract: ContractAdminBody;
}
