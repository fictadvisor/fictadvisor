import { FC } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import PageLayout from '@/components/common/layout/page-layout/PageLayout';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import GreetingBlock from '@/components/pages/main-page/completely-normal-folder/GreetingBlock';
import TokenPopup from '@/components/pages/main-page/components/token-popup';
import * as stylesMUI from '@/components/pages/main-page/MainPage.styles';
import useAuthentication from '@/hooks/use-authentication';
import { GetStudentResourcesResponse } from '@/lib/api/student-resources/types/GetStudentResourcesResponse';
import theme from '@/styles/theme';

import BannerImage from '../../common/icons/BannerImage';

import ResourceCard from './components/resource-card/ResourceCard';

import styles from './MainPage.module.scss';

export interface MainPageProps {
  data: GetStudentResourcesResponse | null;
}

const MainPage: FC<MainPageProps> = ({ data }) => {
  const { query, isReady } = useRouter();
  const token = query.token as string;
  const { isLoggedIn } = useAuthentication();
  const isDesktop = useMediaQuery(theme.breakpoints.up('desktop'));
  const isTablet = useMediaQuery(
    theme.breakpoints.between('tablet', 'desktop'),
  );
  return (
    <PageLayout
      description="FICT Advisor - офіційний сайт Студради ФІОТ.
     Зустрічай твій студентський портал, який надає багато корисних інструментів для студентів.
     Тут ти знайдеш опитування про викладачів, багатофункціональний розклад, можливість керувати групою,
      набори в активне ком’юніті та багато інших цікавих інструментів."
      className={styles['main-page']}
    >
      <Box sx={stylesMUI.mainPageContent}>
        {token && isReady && <TokenPopup token={token} />}
        <Box sx={stylesMUI.infoSection}>
          <Box sx={stylesMUI.infoSectionContent}>
            <Box>
              <Typography sx={stylesMUI.infoSectionTitle}>
                Твій студентський портал
              </Typography>
              <Typography paragraph sx={stylesMUI.infoSectionParagraph}>
                Зустрічай FICT Advisor — офіційний сайт Студради ФІОТ.
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
              {data?.studentResources.map(({ name, id, icon, link }) => (
                <ResourceCard key={id} text={name} image={icon} href={link} />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default MainPage;
