import React, { FC } from 'react';
import {
  RemainingSelectivesResponse,
  SelectiveDisciplinesResponse,
} from '@fictadvisor/utils/responses';
import { Box, Typography } from '@mui/material';

import { getSemesterText } from '@/app/admin/students/common/utils/getSemesterText';

import Dropdowns from './components/dropdowns';
import * as styles from './EditSelective.styles';

interface EditSelectiveProps {
  selectives: SelectiveDisciplinesResponse[];
  remainingSelectives: RemainingSelectivesResponse[];
  setDisconnectedSelectives: React.Dispatch<React.SetStateAction<string[]>>;
  setConnectedSelectives: React.Dispatch<React.SetStateAction<string[]>>;
  connectedSelectives: string[];
}

const EditSelective: FC<EditSelectiveProps> = ({
  selectives,
  remainingSelectives,
  setConnectedSelectives,
  setDisconnectedSelectives,
  connectedSelectives,
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
              setDisconnectedSelectives={setDisconnectedSelectives}
              setConnectedSelectives={setConnectedSelectives}
              connectedSelectives={connectedSelectives}
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
