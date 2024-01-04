import { Box, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button-mui';

import * as styles from './LogoRegisterBlock.styles';

const LogoRegisterBlock = () => {
  const { push } = useRouter();

  return (
    <Box sx={styles.logoRegisterBlock}>
      <Link href="/">
        <Image
          style={{ margin: 0, padding: '8px' }}
          src="/images/login-page/new-logo.png"
          alt="fict advisor logo"
          priority
          width={410}
          height={72}
        />
      </Link>
      <Typography variant="h3SemiBold" sx={styles.registerText}>
        Ти ще не з нами? Приєднуйся!
      </Typography>
      <Button
        sx={styles.registerButton}
        text="Зареєструватися"
        onClick={() => {
          void push('/register');
        }}
      />
    </Box>
  );
};

export default LogoRegisterBlock;
