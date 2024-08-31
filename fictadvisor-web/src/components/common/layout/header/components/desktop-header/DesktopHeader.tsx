'use client';

import { FC } from 'react';
import { AppBar, Link, Toolbar } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Progress from '@/components/common/ui/progress';
import { ProgressSize } from '@/components/common/ui/progress/types';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';

import { mainLinks } from '../../constants';
import { transformUserData } from '../../utils/transformData';
import AuthenticationButtons from '../authentication-buttons';
import HeaderDesktopCard from '../header-desktop-card';

import * as styles from './DesktopHeader.styles';

const DesktopHeader: FC = () => {
  const pathname = usePathname() as string;
  const { user, isLoading } = useAuthentication();

  return (
    <AppBar sx={styles.headerContainer}>
      <Link href="/" component={NextLink} sx={styles.logoContainer}>
        <Image src={'/icons/logo.svg'} alt="FA logo" width={197} height={28} />
      </Link>
      <Toolbar sx={styles.menu}>
        {mainLinks.map(record => (
          <Link
            key={record.link}
            component={NextLink}
            href={record.link}
            underline="none"
          >
            <Button
              sx={styles.button(pathname, record.link)}
              text={record.text}
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link>
        ))}
      </Toolbar>
      <Toolbar>
        {isLoading ? (
          <Progress size={ProgressSize.SMALL} sx={{ padding: '12px' }} />
        ) : user ? (
          <Link
            sx={styles.headerDesktopCard}
            component={NextLink}
            href="/account"
            underline="none"
          >
            <HeaderDesktopCard {...transformUserData(user)} />
          </Link>
        ) : (
          <AuthenticationButtons />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default DesktopHeader;
