import { MouseEventHandler } from 'react';
import { GroupRoles } from '@fictadvisor/utils/enums';

import { Order } from '@/lib/services/group/types/OrderEnum';
import { PermissionResponse } from '@/lib/services/permission/types';

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
  refetch: () => Promise<void>;
}

export interface StudentsTableProps {
  role: keyof typeof GroupRoles;
  permissions: PermissionResponse;
  rows: StudentsTableItem[];
  refetch: () => Promise<void>;
  onSortButtonClick?: MouseEventHandler<HTMLButtonElement>;
  order: Order;
}
