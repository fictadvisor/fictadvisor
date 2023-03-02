import { StudentTableItem } from '@/components/pages/account-page/components/table/student-table/StudentTable';

export const transformStudentsData = (data): StudentTableItem[] =>
  data.map(dataItem => ({
    imgSrc: dataItem.avatar,
    fullName: `${dataItem.firstName} ${dataItem.lastName} ${dataItem.middleName}`,
    role: dataMapper[dataItem.group.role],
    email: dataItem.email,
    value: dataItem.id,
  }));

export const transformRequestsData = (data): StudentTableItem[] =>
  data.map(dataItem => ({
    imgSrc: dataItem.avatar,
    fullName: `${dataItem.firstName} ${dataItem.lastName} ${dataItem.middleName}`,
    email: dataItem.email,
    value: dataItem.id,
  }));

export const dataMapper = {
  ['CAPTAIN']: 'Староста',
  ['MODERATOR']: 'Зам. старости',
  ['STUDENT']: null,
};

export default dataMapper;
