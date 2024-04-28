import React from 'react';
import { ResourceResponse } from '@fictadvisor/utils/responses';
import { Box, Typography } from '@mui/material';
import { Metadata } from 'next';
import { headers } from 'next/headers';

import ResourceCard from '@/app/(main)/main-page/components/resource-card/ResourceCard';
import TokenPopup from '@/app/(main)/main-page/components/token-popup/TokenPopup';
import pageTextsKeys from '@/app/(main)/main-page/constants/MainPageConstants';
import styles from '@/app/(main)/main-page/MainPage.module.scss';
import * as stylesMUI from '@/app/(main)/main-page/MainPage.styles';
import { NewPageTexts } from '@/app/admin/main/components/page-texts-form/types/PageTextsInterfaces';
import BannerImage from '@/components/common/icons/BannerImage';
import PageLayout from '@/components/common/layout/page-layout';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import PageTextsAPI from '@/lib/api/page-texts/PageTextsAPI';
import StudentResourcesAPI from '@/lib/api/student-resources/StudentResourcesAPI';
import mainMetadata from '@/lib/metadata/main';

export const metadata: Metadata = mainMetadata;

export default async function Main() {
  const studentResources = await StudentResourcesAPI.getAll();
  const pageTextsResponse = await PageTextsAPI.getAll({ keys: pageTextsKeys });
  let pageTexts: NewPageTexts = {};

  if (Array.isArray(pageTextsResponse)) {
    pageTexts = pageTextsResponse.reduce((acc, item) => {
      acc[item.key] = item;
      return acc;
    }, {});
  }

  console.log(headers().get('host'));

  return (
    <PageLayout className={styles['main-page']}>
      <Box sx={stylesMUI.mainPageContent}>
        <TokenPopup />
        <Box sx={stylesMUI.infoSection}>
          <Box sx={stylesMUI.infoSectionContent}>
            <Typography sx={stylesMUI.infoSectionTitle}>
              {pageTexts['mainpage_title'].value}
            </Typography>
            <Typography paragraph sx={stylesMUI.infoSectionParagraph}>
              {pageTexts['mainpage_description'].value}
            </Typography>
            <Box sx={stylesMUI.buttonSection}>
              <Box>
                <Button
                  sx={stylesMUI.buttons}
                  size={ButtonSize.MEDIUM}
                  text={pageTexts['mainpage_primary'].value}
                  href={
                    pageTexts['mainpage_primary'].link
                      ? pageTexts['mainpage_primary'].link
                      : ''
                  }
                  disabled={!pageTexts['mainpage_primary'].isShown}
                />
              </Box>
              <Box sx={stylesMUI.buttonDivider}></Box>
              <Box>
                <Button
                  sx={stylesMUI.buttons}
                  size={ButtonSize.MEDIUM}
                  text={pageTexts['mainpage_secondary'].value}
                  href={
                    pageTexts['mainpage_secondary'].link
                      ? pageTexts['mainpage_secondary'].link
                      : ''
                  }
                  disabled={!pageTexts['mainpage_secondary'].isShown}
                  variant={ButtonVariant.OUTLINE}
                />
              </Box>
            </Box>
          </Box>
          <Box sx={stylesMUI.infoSectionImage}>
            <BannerImage />
          </Box>
        </Box>
        <Box sx={stylesMUI.resourcesSection}>
          <Typography sx={stylesMUI.resourcesSectionTitle}>
            {pageTexts['mainpage_studentresources_title'].value}
          </Typography>
          <Box>
            <Box sx={stylesMUI.resourcesSectionCards}>
              {studentResources?.map(
                ({ name, id, imageLink, link }: ResourceResponse) => (
                  <ResourceCard
                    key={id}
                    text={name}
                    image={imageLink}
                    href={link}
                  />
                ),
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}
