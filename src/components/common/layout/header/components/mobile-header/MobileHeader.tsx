import { FC, useState } from 'react';
import { AppBar, Box, Link } from '@mui/material';
import Image from 'next/image';
import NextLink from 'next/link';

import { BurgerMenu } from '@/components/common/custom-svg/BurgerMenu';
import IconButton from '@/components/common/ui/icon-button-mui';
import CloseButton from '@/components/common/ui/icon-button-mui/variants/CloseButton';

import Drawer from './components/drawer/Drawer';
import * as styles from './MobileHeader.styles';

interface MobileHeaderProps {
  isLoggedIn: boolean;
  user: any;
}
const MobileHeader: FC<MobileHeaderProps> = ({ isLoggedIn, user }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleClick = () => {
    setIsOpened(isOpened => !isOpened);
  };

  return (
    <AppBar sx={styles.headerContainer(isOpened)}>
      <Link href="/" component={NextLink} sx={styles.headerLogo}>
        <Image src="/assets/logo.png" alt="logo" width={197} height={20} />
      </Link>
      {isOpened ? (
        <Box sx={styles.iconButton}>
          <CloseButton
            onClick={handleClick}
            size="normal"
            color="transparent"
          />
        </Box>
      ) : (
        <IconButton
          sx={styles.iconButton}
          onClick={handleClick}
          size="normal"
          color="transparent"
          icon={<BurgerMenu />}
        />
      )}
      <Drawer
        isLoggedIn={isLoggedIn}
        isOpened={isOpened}
        handleClick={handleClick}
        user={user}
      />
    </AppBar>
  );
};

export default MobileHeader;
