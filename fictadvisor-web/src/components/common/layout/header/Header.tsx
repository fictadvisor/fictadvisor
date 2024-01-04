import { FC } from 'react';
import { useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';

import useAuthentication from '@/hooks/use-authentication';
import theme from '@/styles/theme';

import transformData from './utils/transformData';

const DesktopHeader = dynamic(() => import('./components/desktop-header'));
const MobileHeader = dynamic(() => import('./components/mobile-header'));

const Header: FC = () => {
  const { isLoggedIn, user } = useAuthentication();
  const transformedUser = transformData(user);
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopMedium'));

  return (
    <>
      {isMobile ? (
        <MobileHeader isLoggedIn={isLoggedIn} user={transformedUser} />
      ) : (
        <DesktopHeader isLoggedIn={isLoggedIn} user={transformedUser} />
      )}
    </>
  );
};

export default Header;
