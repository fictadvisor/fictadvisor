import { Box } from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';

import { LeftBlock } from '@/app/(auth)/register/components/left-block/LeftBlock';
import { RightBlock } from '@/app/(auth)/register/components/right-block/RightBlock';
import imgStyles from '@/app/(auth)/register/RegisterImage.module.scss';
import * as styles from '@/app/(auth)/register/RegisterPage.styles';
import Divider from '@/components/common/ui/divider';
import registerMetadata from '@/lib/metadata/register';

export const metadata: Metadata = registerMetadata;

export default async function RegisterPage() {
  return (
    <Box sx={styles.registerPage}>
      <Image
        quality={100}
        className={imgStyles['background-image']}
        src="/images/register-page/background.png"
        fill
        priority
        alt="дуже гарна картинка"
      />
      <Box sx={styles.registerContent}>
        <LeftBlock />
        <Divider sx={styles.divider} />
        <RightBlock />
      </Box>
    </Box>
  );
}
