import { FC } from 'react';
import { SubjectsResponse } from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';
import Link from 'next/link';

import { SubjectCard } from '@/components/common/ui/cards/subject-card';

import * as styles from './SubjectTab.styles';

interface SubjectTabProps extends SubjectsResponse {
  teacherId: string;
}

const SubjectTab: FC<SubjectTabProps> = ({ subjects, teacherId }) => {
  return (
    <Box sx={styles.wrapper} component="ul">
      {subjects.map(subject => (
        <Box sx={styles.listItem} key={subject.id} component="li">
          <Link
            href={`/discipline?teacherId=${teacherId}&subjectId=${subject.id}`}
          >
            <SubjectCard name={`${subject.name}`} />
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default SubjectTab;
