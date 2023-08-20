import React, { FC, ReactNode } from 'react';
import { Box, Typography } from '@mui/material';

import * as styles from './MobileStudActivityCard.styles';

interface MobileStudActivityCardProps {
  title: string;
  description: ReactNode;
  imgSrc?: string;
}

const MobileStudActivityCard: FC<MobileStudActivityCardProps> = ({
  title,
  description,
  imgSrc,
}) => {
  return (
    <Box sx={styles.wrapper}>
      {imgSrc && (
        <img
          src={imgSrc}
          style={{
            borderRadius: '12px',
            position: 'absolute',
          }}
          alt="Студентська активність"
        />
      )}

      <Box sx={styles.content(imgSrc)}>
        <Typography variant="body2Bold">{title}</Typography>
        {description}
      </Box>
    </Box>
  );
};
export default MobileStudActivityCard;
