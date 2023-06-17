import { FC } from 'react';
import { AppBar, Link, Toolbar } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';

import Button from '@/components/common/ui/button-mui';

import { mainLinks } from '../../constants';
import AuthenticationButtons from '../authentication-buttons';
import HeaderDesktopCard from '../header-desktop-card';

import * as styles from './DesktopHeader.styles';

interface DesktopHeaderProps {
  isLoggedIn: boolean;
  user: any;
}

const DesktopHeader: FC<DesktopHeaderProps> = ({ isLoggedIn, user }) => {
  return (
    <AppBar sx={styles.headerContainer}>
      <Link href="/" component={NextLink} sx={styles.logoContainer}>
        <Image src="/images/logo.png" alt="FA logo" width={197} height={20} />
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
              sx={styles.button}
              text={record.text}
              size="medium"
              variant="text"
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
            <HeaderDesktopCard
              name={user.name}
              groupName={user.groupName}
              position={user.position}
              url={user.avatar}
            />
          </Link>
        ) : (
          <AuthenticationButtons />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default DesktopHeader;
