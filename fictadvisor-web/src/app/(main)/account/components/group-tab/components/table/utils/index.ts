import { OrdinaryStudentResponse } from '@fictadvisor/utils/responses';

import { RequestsTableItem, StudentsTableItem } from '../types';

export const transformStudentsData = (
  data: OrdinaryStudentResponse[],
): StudentsTableItem[] =>
  data.map(
    dataItem =>
      ({
        imgSrc: dataItem.avatar,
        fullName: `${dataItem.lastName} ${dataItem.firstName} ${dataItem.middleName}`,
        role: dataItem.group.role,
        email: dataItem.email,
        id: dataItem.id,
      }) as StudentsTableItem,
  );

export const transformRequestsData = (
  data: OrdinaryStudentResponse[],
): RequestsTableItem[] =>
  data.map(dataItem => ({
    imgSrc: dataItem.avatar,
    fullName: `${dataItem.lastName} ${dataItem.firstName} ${dataItem.middleName}`,
    email: dataItem.email,
    id: dataItem.id,
  }));
