import { FC } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

import * as styles from './HeaderMobileCard.styles';

interface HeaderMobileCardProps {
  name: string;
  groupName: string;
  position: string;
  url?: string;
}

const HeaderMobileCard: FC<HeaderMobileCardProps> = ({
  name,
  groupName,
  position,
  url,
}) => {
  return (
    <Box sx={styles.headerCardContainer}>
      <Box sx={styles.headerCardInfo}>
        <Avatar src={url} alt="Картинка профілю" sx={styles.avatar} />
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
