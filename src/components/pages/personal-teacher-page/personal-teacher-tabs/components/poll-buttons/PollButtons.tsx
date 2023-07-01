import { FC } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import NextLink from 'next/link';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import theme from '@/styles/theme';

import * as styles from './PollButtons.styles';

interface PollButtonsProps {
  text: string;
  buttonInfo: {
    text: string;
    href: string;
  }[];
}

const PollButtons: FC<PollButtonsProps> = ({ text, buttonInfo }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));
  return (
    <Box sx={styles.wrapper}>
      <Typography>{text}</Typography>
      <Box sx={styles.buttonWrapper}>
        {buttonInfo?.map((button, index) => (
          <NextLink key={index} href={button.href}>
            <Button
              text={button.text}
              size={isMobile ? ButtonSize.SMALL : ButtonSize.LARGE}
              sx={styles.button}
            />
          </NextLink>
        ))}
      </Box>
    </Box>
  );
};

export default PollButtons;
