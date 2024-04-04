import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import { GetRemainingSelectivesResponse } from '@/lib/api/student/types/GetRemainingSelectivesResponse';
import { GetSelectivesResponse } from '@/lib/api/student/types/GetSelectivesResponse';

import { getSemesterText } from '../../../common/utils/getSemesterText';

import Dropdowns from './components/dropdowns';
import * as styles from './EditSelective.styles';

interface EditSelectiveProps {
  selectives: GetSelectivesResponse[];
  remainingSelectives: GetRemainingSelectivesResponse[];
  setDisconnectedSelective: React.Dispatch<React.SetStateAction<string[]>>;
  setConnectedSelective: React.Dispatch<React.SetStateAction<string[]>>;
  connectedSelective: string[];
}

const EditSelective: FC<EditSelectiveProps> = ({
  selectives,
  remainingSelectives,
  setConnectedSelective,
  setDisconnectedSelective,
  connectedSelective,
}) => {
  return (
    <Box sx={styles.selectivesWrapper}>
      <Typography variant="body1Medium">Вибіркові</Typography>
      {remainingSelectives.length ? (
        remainingSelectives.map(remainingSelective => (
          <Box key={getSemesterText(remainingSelective)} sx={styles.selective}>
            <Typography variant="body1">
              {getSemesterText(remainingSelective)}
            </Typography>
            <Dropdowns
              currentSelective={selectives.find(
                selective =>
                  selective.semester === remainingSelective.semester &&
                  selective.year === remainingSelective.year,
              )}
              remainingSelective={remainingSelective}
              setDisconnectedSelective={setDisconnectedSelective}
              setConnectedSelective={setConnectedSelective}
              connectedSelective={connectedSelective}
            />
          </Box>
        ))
      ) : (
        <Box>Немає інформації про вибіркові</Box>
      )}
    </Box>
  );
};
export default EditSelective;
