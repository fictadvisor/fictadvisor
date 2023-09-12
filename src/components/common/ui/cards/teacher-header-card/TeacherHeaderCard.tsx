import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import {
  Avatar,
  Box,
  SxProps,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';

import Tooltip from '@/components/common/ui/tooltip';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';
import theme from '@/styles/theme';

import * as styles from './TeacherHeaderCard.styles';

type TeacherHeaderCardProps = {
  name: string;
  description: string;
  url?: string;
  sx?: SxProps<Theme>;
};

const TeacherHeaderCard: React.FC<TeacherHeaderCardProps> = ({
  name,
  description,
  url = '/images/lecturer-avatar.png',
  sx = {},
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));

  return (
    <Box sx={mergeSx(styles.card, sx)}>
      {isMobile ? (
        <Box sx={styles.chevronIcon}>
          <ChevronLeftIcon />
        </Box>
      ) : (
        <Avatar src={url} alt="картинка викладача" sx={styles.avatar} />
      )}
      <Box sx={styles.cardInfo}>
        <Typography variant="body1Medium">{name}</Typography>
        {isMobile ? (
          <Typography variant="overline" sx={styles.description}>
            {description}
          </Typography>
        ) : (
          <Tooltip title={description} arrow={true}>
            <Typography variant="overline" sx={styles.description}>
              {description}
            </Typography>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default TeacherHeaderCard;
