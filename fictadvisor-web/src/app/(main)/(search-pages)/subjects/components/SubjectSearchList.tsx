import { FC, useCallback, useEffect } from 'react';
import { SubjectCountResponse } from '@fictadvisor/utils/responses';
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';

import { breakpoints } from '@/app/(main)/(search-pages)/subjects/components/constants/breakpoints';
import { SubjectCard } from '@/components/common/ui/cards/subject-card';
import useToast from '@/hooks/use-toast';

import * as styles from './SubjectSearchList.styles';

const TOAST_TIMER = 4000;

interface SubjectSearchListProps {
  subjects: SubjectCountResponse[];
  isFetching: boolean;
}

export const SubjectSearchList: FC<SubjectSearchListProps> = ({
  subjects,
  isFetching,
}) => {
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (subjects.length === 0 && !isFetching) {
      toast.error('Результатів за запитом не знайдено', '', TOAST_TIMER);
    }
  }, [isFetching, subjects.length]);

  const redirect = useCallback(
    (subjectId: string) => () => {
      void router.push(`/subjects/${subjectId}/teachers`);
    },
    [],
  );

  return (
    <Masonry columns={breakpoints} spacing={2} sx={styles.masonry}>
      {subjects.map(subject => (
        <Box key={subject.id}>
          <SubjectCard
            onClick={redirect(subject.id)}
            name={`${subject.name}`}
            details={`${
              subject.amount +
              ' ' +
              (subject.amount === 1
                ? 'викладач'
                : subject.amount === 2 ||
                    subject.amount === 3 ||
                    subject.amount === 4
                  ? 'викладачі'
                  : 'викладачів')
            }`}
          />
        </Box>
      ))}
    </Masonry>
  );
};
