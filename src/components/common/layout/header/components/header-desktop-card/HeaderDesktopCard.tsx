import { FC } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

import * as styles from './HeaderDesktopCard.styles';

interface HeaderCardProps {
  name: string;
  groupName: string;
  position: string;
  url: string;
}

const HeaderDesktopCard: FC<HeaderCardProps> = ({
  name,
  groupName,
  position,
  url,
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
      <Avatar src={url} alt="Картинка профілю" sx={styles.avatar} />
    </Box>
  );
};

export default HeaderDesktopCard;
