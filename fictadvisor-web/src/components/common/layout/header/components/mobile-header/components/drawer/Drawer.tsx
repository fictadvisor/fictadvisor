import { FC } from 'react';
import { Box, Drawer as MuiDrawer, Link } from '@mui/material';
import { useSearchParams } from 'next/dist/client/components/navigation';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import Divider from '@/components/common/ui/divider';
import Tab from '@/components/common/ui/tab/tab';
import { TabTextPosition } from '@/components/common/ui/tab/tab/types';

import { accountButtons, mainLinks } from '../../../../constants';
import { TransformedUser } from '../../../../types';
import AuthenticationButtons from '../../../authentication-buttons';
import HeaderMobileCard from '../../../header-mobile-card';

import * as styles from './Drawer.styles';

export interface DrawerProps {
  isLoggedIn: boolean;
  isOpened: boolean;
  handleClick: () => void;
  user: TransformedUser;
}
const Drawer: FC<DrawerProps> = ({
  isLoggedIn,
  isOpened,
  handleClick,
  user,
}) => {
  const params = useSearchParams().toString();
  const pathname = `${usePathname()}${params ? `?${params}` : ''}`;

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
            <HeaderMobileCard {...user} />
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
                  textPosition={TabTextPosition.LEFT}
                  icon={button.icon}
                  sx={
                    pathname === button.link
                      ? styles.activeMenuTab
                      : styles.menuTab
                  }
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
              sx={
                pathname === data.link ? styles.activeMenuTab : styles.menuTab
              }
              textPosition={TabTextPosition.LEFT}
              icon={data.icon}
            />
          </Link>
        ))}
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
