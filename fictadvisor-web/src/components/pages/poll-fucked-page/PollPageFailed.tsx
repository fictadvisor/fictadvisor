import React from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import * as styles from '@/components/pages/password-recovery/link-valid/PasswordResetValidLinkPage.styles';
import theme from '@/styles/theme';

const PollPageFailed = () => {
  const router = useRouter();
  const returnAuth = () => {
    void router.push('/about');
  };
  const returnMain = () => {
    void router.push('/');
  };
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <Box sx={styles.container}>
      <Box sx={styles.content}>
        <Box sx={styles.icon}>
          <WrenchScrewdriverIcon />
        </Box>
        <Typography sx={styles.title}>Ведуться технічні роботи</Typography>
        <Typography sx={styles.description}>
          Привіт! Dev-відділ дуже старається, щоб все було класно, тому зараз на
          сторінці опитувань проводяться технічні роботи. Скоро повернемось!
        </Typography>
        <Image
          src="/gifs/frog-complete.gif"
          alt="Frogs complete the poll"
          width={isMobile ? 300 : 480}
          height={isMobile ? 125 : 200}
          quality={100}
        />
        <Button
          text="Подивитись на круту сторінку про наш факультет"
          variant={ButtonVariant.FILLED}
          size={ButtonSize.LARGE}
          color={ButtonColor.PRIMARY}
          onClick={returnAuth}
          sx={styles.button}
        />
        <Button
          text="Повернутись на головну"
          variant={ButtonVariant.TEXT}
          size={ButtonSize.LARGE}
          color={ButtonColor.PRIMARY}
          onClick={returnMain}
          sx={styles.button}
        />
      </Box>
    </Box>
  );
};

export default PollPageFailed;
