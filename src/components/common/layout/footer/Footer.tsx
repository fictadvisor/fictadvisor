import { FC } from 'react';
import { Box, Link, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import IconButton from '@/components/common/ui/icon-button-mui/IconButton';
import { IconButtonColor } from '@/components/common/ui/icon-button-mui/types';
import theme from '@/styles/theme';

import { mainLinks, socialLinks, supportLinks } from './constants';
import * as styles from './Footer.styles';

const Footer: FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktop'));

  return (
    <Box sx={styles.footerContainer}>
      <Box sx={styles.footerLogoContainer}>
        <Link href="/" component={NextLink} sx={styles.footerLogo}>
          <Image
            src="/images/logo.png"
            quality={100}
            width={197}
            height={20}
            alt="logo"
          />
        </Link>
        <Typography sx={styles.signature}>By Dev-відділ СР ФІОТ</Typography>
      </Box>

      <Box sx={styles.mainReferences}>
        <Typography sx={styles.title}>Основні посилання</Typography>
        {mainLinks.map((data, index) => (
          <Link
            key={index}
            component={NextLink}
            href={data.link}
            underline="none"
          >
            <Button
              sx={styles.button}
              text={data.text}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.TEXT}
            />
          </Link>
        ))}
      </Box>

      <Box sx={styles.support}>
        <Typography sx={styles.title}>Підтримка</Typography>
        {supportLinks.map((data, index) => (
          <Link
            key={index}
            component={NextLink}
            href={data.link}
            underline="none"
          >
            <Button
              sx={styles.button}
              text={data.text}
              size={ButtonSize.SMALL}
              variant={ButtonVariant.TEXT}
            />
          </Link>
        ))}
      </Box>

      <Box sx={styles.socialMedia}>
        <Typography sx={styles.title}>Соцмережі</Typography>
        <Box sx={styles.socialButtons}>
          {socialLinks.map((data, index) => (
            <Link
              sx={styles.iconLink}
              key={index}
              component={NextLink}
              href={data.link}
              target="_blanket"
              underline="none"
            >
              <IconButton
                sx={styles.button}
                icon={data.icon}
                color={IconButtonColor.TRANSPARENT}
              />
              <Typography variant="body1Bold" color="grey.600">
                {!isMobile && data.text}
              </Typography>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
