import { QueryObserverBaseResult } from 'react-query';

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
  rows: StudentsTableItem[];
  refetch: QueryObserverBaseResult['refetch'];
}
