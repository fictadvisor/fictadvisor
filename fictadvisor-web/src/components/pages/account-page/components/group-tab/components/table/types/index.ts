import { QueryObserverBaseResult } from 'react-query';

import { PermissionResponse } from '@/lib/services/permisson/types';
import { UserGroupRole } from '@/types/user';

export interface RequestsTableItem {
  imgSrc?: string;
  fullName: string;
  email: string;
  id: string;
}

export interface StudentsTableItem extends RequestsTableItem {
  role: UserGroupRole;
}

export interface RequestsTableProps {
  rows: RequestsTableItem[];
  refetch: QueryObserverBaseResult['refetch'];
}

export interface StudentsTableProps {
  role: UserGroupRole;
  permissions: PermissionResponse;
  rows: StudentsTableItem[];
  refetch: QueryObserverBaseResult['refetch'];
}
