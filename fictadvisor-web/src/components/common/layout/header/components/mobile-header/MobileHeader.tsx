'use client';

import { FC, useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { AppBar, Box, Link } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';

import { TransformedUser } from '@/components/common/layout/header/types';
import IconButton from '@/components/common/ui/icon-button-mui';
import {
  IconButtonColor,
  IconButtonSize,
} from '@/components/common/ui/icon-button-mui/types';
import { CloseButton } from '@/components/common/ui/icon-button-mui/variants';

import Drawer from './components/drawer/Drawer';
import * as styles from './MobileHeader.styles';

const MobileHeader: FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(isOpened => !isOpened);
  };

  return (
    <AppBar sx={styles.headerContainer(isOpened)}>
      <Link href="/" component={NextLink} sx={styles.headerLogo}>
        <Image src={'/icons/logo.svg'} alt="FA logo" width={197} height={28} />
      </Link>
      {isOpened ? (
        <Box sx={styles.iconButton}>
          <CloseButton
            onClick={handleClick}
            size={IconButtonSize.NORMAL}
            color={IconButtonColor.TRANSPARENT}
          />
        </Box>
      ) : (
        <IconButton
          sx={styles.iconButton}
          onClick={handleClick}
          size={IconButtonSize.NORMAL}
          color={IconButtonColor.TRANSPARENT}
          icon={<Bars3Icon />}
        />
      )}
      <Drawer isOpened={isOpened} handleClick={handleClick} />
    </AppBar>
  );
};

export default MobileHeader;
