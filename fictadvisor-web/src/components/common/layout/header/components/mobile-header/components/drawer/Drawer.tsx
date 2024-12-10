import { FC } from 'react';
import { Box, Drawer as MuiDrawer, Link } from '@mui/material';
import { useSearchParams } from 'next/dist/client/components/navigation';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import Divider from '@/components/common/ui/divider';
import Progress from '@/components/common/ui/progress';
import { ProgressSize } from '@/components/common/ui/progress/types';
import Tab from '@/components/common/ui/tab/tab';
import { TabTextPosition } from '@/components/common/ui/tab/tab/types';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';

import { accountButtons, mainLinks } from '../../../../constants';
import { transformUserData } from '../../../../utils/transformData';
import AuthenticationButtons from '../../../authentication-buttons';
import HeaderMobileCard from '../../../header-mobile-card';

import * as styles from './Drawer.styles';

export interface DrawerProps {
  isOpened: boolean;
  handleClick: () => void;
}
const Drawer: FC<DrawerProps> = ({ isOpened, handleClick }) => {
  const params = useSearchParams().toString();
  const pathname = `${usePathname()}${params ? `?${params}` : ''}`;
  const { user, isLoading } = useAuthentication();

  return (
    <MuiDrawer
      anchor="top"
      open={isOpened}
      sx={styles.drawer}
      disableScrollLock
      onClose={handleClick}
    >
      {isLoading ? (
        <Progress
          size={ProgressSize.SMALL}
          sx={{ padding: '12px', mx: '16px' }}
        />
      ) : user ? (
        <>
          <Link
            href="/account"
            component={NextLink}
            onClick={handleClick}
            underline="none"
            color="inherit"
          >
            <HeaderMobileCard {...transformUserData(user)} />
          </Link>
          <Box sx={styles.menu}>
            {accountButtons.map(button => (
              <Link
                component={NextLink}
                key={button.link}
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
      <Divider sx={styles.divider(!!user)} />
      <Box sx={styles.menu}>
        {mainLinks.map(data => (
          <Link
            component={NextLink}
            key={data.link}
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
