import { MouseEventHandler } from 'react';
import { GroupRoles } from '@fictadvisor/utils/enums';
import { CheckPermissionsResponse } from '@fictadvisor/utils/responses';
import { QueryObserverBaseResult } from '@tanstack/react-query';

import { Order } from '@/lib/services/group/types/OrderEnum';

export interface RequestsTableItem {
  imgSrc?: string;
  fullName: string;
  email: string;
  id: string;
}

export interface StudentsTableItem extends RequestsTableItem {
  role: keyof typeof GroupRoles;
}

export interface RequestsTableProps {
  rows: RequestsTableItem[];
  refetch: QueryObserverBaseResult['refetch'];
}

export interface StudentsTableProps {
  role: keyof typeof GroupRoles;
  permissions: CheckPermissionsResponse['permissions'];
  rows: StudentsTableItem[];
  refetch: QueryObserverBaseResult['refetch'];
  onSortButtonClick?: MouseEventHandler<HTMLButtonElement>;
  order: Order;
}
