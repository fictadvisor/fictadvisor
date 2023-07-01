import { FC } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

import { HeaderCardProps } from '../../types';

import * as styles from './HeaderMobileCard.styles';

const HeaderMobileCard: FC<HeaderCardProps> = ({
  name,
  groupName,
  position,
  avatar,
}) => {
  return (
    <Box sx={styles.headerCardContainer}>
      <Box sx={styles.headerCardInfo}>
        <Avatar src={avatar} alt="Картинка профілю" sx={styles.avatar} />
        <Box>
          <Typography variant="body1Medium" color="grey.600">
            {name}
          </Typography>
          <Box sx={styles.userInfo}>
            {groupName && (
              <Typography variant="overline" sx={styles.headerCardGroupName}>
                {groupName}
              </Typography>
            )}
            <Typography variant="overline" sx={styles.position}>
              {position}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeaderMobileCard;
