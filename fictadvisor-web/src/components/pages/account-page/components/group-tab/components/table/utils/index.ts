import { GroupStudent, PendingStudent } from '@/types/student';

import { RequestsTableItem, StudentsTableItem } from '../types';

export const transformStudentsData = (
  data: GroupStudent[],
): StudentsTableItem[] =>
  data.map(dataItem => ({
    imgSrc: dataItem.avatar,
    fullName: `${dataItem.lastName} ${dataItem.firstName} ${dataItem.middleName}`,
    role: dataItem.group.role,
    email: dataItem.email,
    id: dataItem.id,
  }));

export const transformRequestsData = (
  data: PendingStudent[],
): RequestsTableItem[] =>
  data.map(dataItem => ({
    imgSrc: dataItem.avatar,
    fullName: `${dataItem.lastName} ${dataItem.firstName} ${dataItem.middleName}`,
    email: dataItem.email,
    id: dataItem.id,
  }));
