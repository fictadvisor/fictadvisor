import React from 'react';
import { Box, Typography } from '@mui/material';

import * as styles from './SubjectCard.styles';
interface SubjectCardProps {
  name: string;
  details?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
  name,
  details,
  disabled = false,
  ...rest
}) => {
  return (
    <Box sx={styles.subjectCard(disabled)} {...rest}>
      <Box sx={styles.subjectName}>{name}</Box>
      {details && <Typography sx={{ mb: 2 }}>{details}</Typography>}
    </Box>
  );
};
