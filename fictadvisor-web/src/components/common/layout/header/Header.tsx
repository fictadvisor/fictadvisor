'use client';

import { FC } from 'react';
import { useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';

import theme from '@/styles/theme';

const DesktopHeader = dynamic(() => import('./components/desktop-header'));
const MobileHeader = dynamic(() => import('./components/mobile-header'));

const Header: FC = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('desktopMedium'));

  return isMobile ? <MobileHeader /> : <DesktopHeader />;
};

export default Header;
