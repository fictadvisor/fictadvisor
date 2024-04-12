import { FC } from 'react';
import { Box } from '@mui/material';

import * as styles from './FillerBox.styles';
interface FillerBoxProps {
  width: string;
}

const FillerBox: FC<FillerBoxProps> = ({ width }) => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, index) => (
        <Box key={index} sx={styles.filler(width)} />
      ))}
    </>
  );
};

export default FillerBox;
