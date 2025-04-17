import { QueryAllRolesDTO } from '@fictadvisor/utils/requests';

export interface HeaderRolesSearchProps {
  onSubmit: (values: QueryAllRolesDTO) => void;
  values: QueryAllRolesDTO;
}
