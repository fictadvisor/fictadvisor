'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import { QueryAllSubjectDTO } from '@fictadvisor/utils/requests';
import { PaginatedSubjectsResponse } from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { SubjectInitialValues } from '@/app/(main)/(search-pages)/search-form/constants';
import SearchForm, {
  SearchFormProps,
} from '@/app/(main)/(search-pages)/search-form/SearchForm';
import { SearchFormFields } from '@/app/(main)/(search-pages)/search-form/types';
import { SubjectSearchList } from '@/app/(main)/(search-pages)/subjects/components/SubjectSearchList';
import {
  breadcrumbs,
  filterOptions,
  PAGE_SIZE,
} from '@/app/(main)/(search-pages)/subjects/constants';
import * as styles from '@/app/(main)/(search-pages)/subjects/SubjectSearchPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Progress from '@/components/common/ui/progress';
import SubjectsAPI from '@/lib/api/subject/SubjectAPI';
import { Subject } from '@/types/subject';

interface ClientSubjectsPageProps {
  initialData: PaginatedSubjectsResponse;
}

const ClientSubjectsPage: FC<ClientSubjectsPageProps> = ({ initialData }) => {
  const localStorageName = 'subjectForm';

  const [queryObj, setQueryObj] =
    useState<SearchFormFields>(SubjectInitialValues);
  const [currPage, setCurrPage] = useState(0);

  const [loadedSubjects, setLoadedSubjects] = useState<Subject[]>(
    initialData.subjects,
  );

  const [reloadSubjects, setReloadSubjects] = useState(true);

  const submitHandler: SearchFormProps['onSubmit'] = useCallback(query => {
    setReloadSubjects(true);
    setLoadedSubjects([]);
    setQueryObj(prev => ({ ...prev, ...query }));
  }, []);

  const downloadHandler = () => {
    setReloadSubjects(false);
    setCurrPage(prev => prev + 1);
  };

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ['subjects', reloadSubjects],
    queryFn: () => {
      if (reloadSubjects) {
        return SubjectsAPI.getAll({
          ...queryObj,
          pageSize: PAGE_SIZE * (currPage + 1),
          page: currPage,
        } as QueryAllSubjectDTO);
      } else {
        setLoadedSubjects(prevSubjects => [
          ...prevSubjects,
          ...(data?.subjects ?? []),
        ]);
        return SubjectsAPI.getAll({
          ...queryObj,
          pageSize: PAGE_SIZE,
          page: currPage + 1,
        } as QueryAllSubjectDTO);
      }
    },
    placeholderData: (previousData, previousQuery) => previousData,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    void refetch();
  }, [queryObj, currPage, reloadSubjects]);

  return (
    <Box sx={styles.layout}>
      <Breadcrumbs items={breadcrumbs} sx={styles.breadcrumbs} />
      <SearchForm
        initialValues={SubjectInitialValues}
        searchPlaceholder="Оберіть предмет"
        filterDropDownOptions={filterOptions}
        onSubmit={submitHandler}
        setQueryObj={setQueryObj}
        localStorageName={localStorageName}
        isSubject={true}
      />
      {data && (
        <SubjectSearchList subjects={[...loadedSubjects, ...data.subjects]} />
      )}
      {(isLoading || isFetching) && (
        <Box sx={styles.pageLoader}>
          <Progress />
        </Box>
      )}
      {(data?.subjects?.length ?? 0) + loadedSubjects.length ===
        (currPage + 1) * PAGE_SIZE && (
        <Button
          sx={styles.loadBtn}
          text="Завантажити ще"
          variant={ButtonVariant.FILLED}
          color={ButtonColor.SECONDARY}
          onClick={downloadHandler}
        />
      )}
    </Box>
  );
};

export default ClientSubjectsPage;
