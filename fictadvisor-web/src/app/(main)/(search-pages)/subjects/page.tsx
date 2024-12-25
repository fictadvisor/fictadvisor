'use server';
import { FC } from 'react';
import { QueryAllSubjectDTO } from '@fictadvisor/utils/requests';

import SubjectsAPI from '@/lib/api/subject/SubjectAPI';

import ClientSubjectsPage from './ClientSubjectsPage';
import { PAGE_SIZE } from './constants';

const fetchSubjects = async (currPage: number) => {
  const queryObj: QueryAllSubjectDTO = {
    page: currPage,
    pageSize: PAGE_SIZE,
  };
  const data = await SubjectsAPI.getAll(queryObj);
  return data;
};

const SubjectsPage: FC = async () => {
  const data = await fetchSubjects(0);
  return <ClientSubjectsPage initialData={data} />;
};

export default SubjectsPage;
