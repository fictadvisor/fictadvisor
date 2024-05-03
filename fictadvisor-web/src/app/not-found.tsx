import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Box, Typography } from '@mui/material';
import { Metadata } from 'next';
import Link from 'next/link';

import * as styles from '@/app/(main)/404-page/NotFoundPage.styles';
import PageLayout from '@/components/common/layout/page-layout';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import notFoundMetadata from '@/lib/metadata/not-found';

export const metadata: Metadata = notFoundMetadata;

export default function NotFound() {
  return (
    <PageLayout hasFooter={false}>
      <Box sx={styles.pageLayout}>
        <Box sx={styles.pageContent}>
          <Typography sx={styles.notFoundText}>
            Упс! Сторінку не знайдено. Жабка з’їла твою сторінку
          </Typography>
          <Box sx={styles.frogImage}>
            <img src="/icons/404-page/404-frog.svg" alt="Це 404" />
          </Box>
          <Box sx={styles.buttons}>
            <Link href="/">
              <Button
                text="Повернутися на головну"
                variant={ButtonVariant.FILLED}
                size={ButtonSize.LARGE}
                color={ButtonColor.SECONDARY}
                startIcon={<ChevronLeftIcon />}
                sx={styles.button}
              />
            </Link>
            <Link href="https://t.me/fict_robot">
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
