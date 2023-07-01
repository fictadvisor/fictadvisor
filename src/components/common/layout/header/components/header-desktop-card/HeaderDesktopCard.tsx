import { FC } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

import { HeaderCardProps } from '../../types';

import * as styles from './HeaderDesktopCard.styles';

const HeaderDesktopCard: FC<HeaderCardProps> = ({
  name,
  groupName,
  position,
  avatar,
}) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.cardInfo}>
        <Typography variant="body1Medium" sx={styles.name}>
          {name}
        </Typography>
        <Box>
          <Typography variant="overline" sx={styles.position}>
            {position}
          </Typography>
          {groupName && (
            <Typography variant="overline" sx={styles.groupName}>
              {groupName}
            </Typography>
          )}
        </Box>
      </Box>
      <Avatar src={avatar} alt="Картинка профілю" sx={styles.avatar} />
    </Box>
  );
};

export default HeaderDesktopCard;
