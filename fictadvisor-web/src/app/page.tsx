import { Box, Typography } from '@mui/material';
import { Metadata } from 'next';

import ResourceCard from '@/app/main-page/components/resource-card/ResourceCard';
import TokenPopup from '@/app/main-page/components/token-popup/TokenPopup';
import styles from '@/app/main-page/MainPage.module.scss';
import * as stylesMUI from '@/app/main-page/MainPage.styles';
import BannerImage from '@/components/common/icons/BannerImage';
import PageLayout from '@/components/common/layout/page-layout';
import StudentResourcesAPI from '@/lib/api/student-resources/StudentResourcesAPI';
import { GetStudentResourcesResponse } from '@/lib/api/student-resources/types/GetStudentResourcesResponse';
import mainMetadata from '@/lib/metadata/main';

export const metadata: Metadata = mainMetadata;

export interface MainPageProps {
  data: GetStudentResourcesResponse | null;
}

export default async function Main() {
  let data: MainPageProps['data'];

  try {
    data = await StudentResourcesAPI.getAll();
  } catch (error: unknown) {
    data = null;
  }

  return (
    <PageLayout className={styles['main-page']}>
      <Box sx={stylesMUI.mainPageContent}>
        <TokenPopup />
        <Box sx={stylesMUI.infoSection}>
          <Box sx={stylesMUI.infoSectionContent}>
            <Box>
              <Typography sx={stylesMUI.infoSectionTitle}>
                Твій студентський портал
              </Typography>
              <Typography paragraph sx={stylesMUI.infoSectionParagraph}>
                Зустрічай FICE Advisor — офіційний сайт Студради ФІОТ.
                Опитування про викладачів, багатофункціональний розклад,
                керування групою, набори в наше активне ком’юніті, розіграш шар
                та інші інструменти — шукай саме тут!
              </Typography>
            </Box>
          </Box>
          <Box sx={stylesMUI.infoSectionImage}>
            <BannerImage />
          </Box>
        </Box>
        <Box sx={stylesMUI.resourcesSection}>
          <Typography sx={stylesMUI.resourcesSectionTitle}>
            Студентські ресурси
          </Typography>
          <Box>
            <Box sx={stylesMUI.resourcesSectionCards}>
              {data?.studentResources?.map(({ name, id, imageLink, link }) => (
                <ResourceCard
                  key={id}
                  text={name}
                  image={imageLink}
                  href={link}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
}
