import { FC } from 'react';
import { Box, Drawer as MuiDrawer, Link } from '@mui/material';
import NextLink from 'next/link';

import Divider from '@/components/common/ui/divider-mui';
import Tab from '@/components/common/ui/tab-mui/tab';

import { accountButtons, mainLinks } from '../../../../constants';
import AuthenticationButtons from '../../../authentication-buttons';
import HeaderMobileCard from '../../../header-mobile-card';

import * as styles from './Drawer.styles';

export interface DrawerProps {
  isLoggedIn: boolean;
  isOpened: boolean;
  handleClick: () => void;
  user: any;
}

const Drawer: FC<DrawerProps> = ({
  isLoggedIn,
  isOpened,
  handleClick,
  user,
}) => {
  return (
    <MuiDrawer
      anchor="top"
      open={isOpened}
      sx={styles.drawer}
      disableScrollLock
      onClose={handleClick}
    >
      {isLoggedIn ? (
        <>
          <Link
            href="/account"
            component={NextLink}
            onClick={handleClick}
            underline="none"
            color="inherit"
          >
            <HeaderMobileCard
              name={user.name}
              groupName={user.groupName}
              position={user.position}
              url={user.avatar}
            />
          </Link>
          <Box sx={styles.menu}>
            {accountButtons.map((button, index) => (
              <Link
                component={NextLink}
                key={index}
                href={button.link}
                onClick={handleClick}
                underline="none"
                color="inherit"
              >
                <Tab
                  label={button.text}
                  textPosition="left"
                  icon={button.icon}
                  sx={styles.menuTab}
                />
              </Link>
            ))}
          </Box>
        </>
      ) : (
        <AuthenticationButtons />
      )}
      <Divider sx={styles.divider(isLoggedIn)} />
      <Box sx={styles.menu}>
        {mainLinks.map((data, index) => (
          <Link
            component={NextLink}
            key={index}
            href={data.link}
            onClick={handleClick}
            underline="none"
            color="inherit"
          >
            <Tab
              label={data.text}
              sx={styles.menuTab}
              textPosition="left"
              icon={data.icon}
            />
          </Link>
        ))}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
