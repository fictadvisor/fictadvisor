import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/common/ui/button-mui';

import * as styles from './LogoRegisterBlock.styles';

export const LogoRegisterBlock = () => {
  return (
    <Box sx={styles.logoRegisterBlock}>
      <Link href="/">
        <Image
          style={{ margin: 0, padding: '8px' }}
          src="/icons/logo.svg"
          alt="fice advisor logo"
          priority
          width={410}
          height={72}
        />
      </Link>
      <Typography variant="h3SemiBold" sx={styles.registerText}>
        Ти ще не з нами? Приєднуйся!
      </Typography>
      <Button
        href="/register"
        sx={styles.registerButton}
        text="Зареєструватися"
      />
    </Box>
  );
};
