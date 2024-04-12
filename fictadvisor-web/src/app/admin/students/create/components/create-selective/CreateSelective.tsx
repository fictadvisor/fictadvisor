import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Box, Typography } from '@mui/material';

import { getSemesterText } from '@/app/admin/students/common/utils/getSemesterText';
import GroupAPI from '@/lib/api/group/GroupAPI';

import Dropdowns from './components/dropdowns';
import * as styles from './CreateSelective.styles';

interface CreateSelectiveProps {
  groupId: string;
  setConnectedSelective: React.Dispatch<React.SetStateAction<string[]>>;
}

const CreateSelective: FC<CreateSelectiveProps> = ({
  setConnectedSelective,
  groupId,
}) => {
  const { data: remainingSelectives } = useQuery(
    ['getRemainingSelectiveByGroupId', groupId],
    () => GroupAPI.getSelectives(groupId),
  );
  return (
    <>
      {remainingSelectives ? (
        remainingSelectives.map(remainingSelective => (
          <Box key={getSemesterText(remainingSelective)} sx={styles.selective}>
            <Typography variant="body1">
              {getSemesterText(remainingSelective)}
            </Typography>
            <Dropdowns
              remainingSelective={remainingSelective}
              setConnectedSelective={setConnectedSelective}
            />
          </Box>
        ))
      ) : (
        <Box>Немає інформації про вибіркові</Box>
      )}
    </>
  );
};
export default CreateSelective;
