import { FC } from 'react';
import { AppBar, Link, Toolbar } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';

import { mainLinks } from '../../constants';
import { TransformedUser } from '../../types';
import AuthenticationButtons from '../authentication-buttons';
import HeaderDesktopCard from '../header-desktop-card';

import * as styles from './DesktopHeader.styles';

interface DesktopHeaderProps {
  isLoggedIn: boolean;
  user: TransformedUser;
}

const DesktopHeader: FC<DesktopHeaderProps> = ({ isLoggedIn, user }) => {
  const router = useRouter();

  return (
    <AppBar sx={styles.headerContainer}>
      <Link href="/" component={NextLink} sx={styles.logoContainer}>
        <Image
          src={'/icons/fly-logo.svg'}
          alt="FA logo"
          width={197}
          height={28}
        />
      </Link>
      <Toolbar sx={styles.menu}>
        {mainLinks.map((record, index) => (
          <Link
            key={index}
            component={NextLink}
            href={record.link}
            underline="none"
          >
            <Button
              sx={styles.button(router.pathname, record.link)}
              text={record.text}
              size={ButtonSize.MEDIUM}
              variant={ButtonVariant.TEXT}
            />
          </Link>
        ))}
      </Toolbar>
      <Toolbar>
        {isLoggedIn ? (
          <Link
            sx={styles.headerDesktopCard}
            component={NextLink}
            href="/account"
            underline="none"
          >
            <HeaderDesktopCard {...user} />
          </Link>
        ) : (
          <AuthenticationButtons />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default DesktopHeader;
