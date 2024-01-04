import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Button from '@/components/common/ui/button-mui';

import * as stylesMUI from './RightBlock.styles';

import styles from './RightBlock.module.scss';

const RightBlock = () => {
  const router = useRouter();

  return (
    <Box sx={stylesMUI.rightBlock}>
      <Link href="/">
        <Image
          className={styles['login-logo']}
          src="/images/login-page/new-logo.png"
          alt="fict advisor logo"
          priority
          width={394}
          height={70}
        />
      </Link>
      <Typography variant="h3" sx={stylesMUI.loginText}>
        Вже маєш акаунт? Заходь!
      </Typography>
      <Button
        sx={stylesMUI.loginButton}
        text="Вхід"
        onClick={() => {
          void router.push('/login');
        }}
      />
    </Box>
  );
};

export default RightBlock;
