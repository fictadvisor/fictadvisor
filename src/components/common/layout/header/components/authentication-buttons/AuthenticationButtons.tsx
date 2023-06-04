import { FC } from 'react';
import { Box, Link } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import NextLink from 'next/link';

import Button from '@/components/common/ui/button-mui';
import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import * as styles from './AuthenticationButtons.styles';

interface AuthenticationButtonsProps {
  sx?: SxProps<Theme>;
}

const AuthenticationButtons: FC<AuthenticationButtonsProps> = ({ sx }) => {
  return (
    <Box sx={mergeSx(styles.authenticationButtons, sx)}>
      <Link
        href="/register"
        component={NextLink}
        sx={styles.registerButton}
        underline="none"
        color="inherit"
      >
        <Button text="Зареєструватись" size="small" variant="outline" />
      </Link>
      <Link
        href="/login"
        component={NextLink}
        sx={styles.loginButton}
        underline="none"
        color="inherit"
      >
        <Button text="Увійти" size="small" variant="filled" />
      </Link>
    </Box>
  );
};

export default AuthenticationButtons;
