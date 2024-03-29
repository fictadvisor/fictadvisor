import { MouseEventHandler } from 'react';
import { QueryObserverBaseResult } from 'react-query';

import { Order } from '@/lib/services/group/types/OrderEnum';
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
  onSortButtonClick?: MouseEventHandler<HTMLButtonElement>;
  order: Order;
}
