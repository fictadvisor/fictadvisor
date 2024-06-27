'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import * as styles from '@/app/(main)/error-pages/MainErrorPage.styles';
import PageLayout from '@/components/common/layout/page-layout';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <PageLayout hasFooter={false}>
      <Box sx={styles.errorLayout}>
        <Box sx={styles.errorContent}>
          <Typography sx={styles.errorText}>Упс! Щось пішло не так</Typography>
          <Typography sx={styles.errorMessage}>{error.message}</Typography>
          <Box sx={styles.errorButtons}>
            <Button
              text="Спробувати ще раз"
              variant={ButtonVariant.FILLED}
              size={ButtonSize.LARGE}
              color={ButtonColor.SECONDARY}
              sx={styles.button}
              onClick={() => reset()}
            />
            <Link href="https://t.me/fice_robot">
              <Button
                text="Зв'язатися з адміністратором"
                variant={ButtonVariant.FILLED}
                size={ButtonSize.LARGE}
                sx={styles.button}
              />
            </Link>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}
