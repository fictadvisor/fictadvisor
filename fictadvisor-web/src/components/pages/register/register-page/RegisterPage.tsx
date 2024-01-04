import { FC } from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

import Divider from '@/components/common/ui/divider';
import { GetAllResponse } from '@/lib/api/group/types/GetAllResponse';

import LeftBlock from './components/left-block';
import RightBlock from './components/right-block';
import * as styles from './RegisterPage.styles';

import imgStyles from './RegisterImage.module.scss';

export interface RegisterPageProps {
  data: GetAllResponse | null;
}

const RegisterPage: FC<RegisterPageProps> = ({ data }) => {
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
        <LeftBlock groups={data?.groups || []} />
        <Divider sx={styles.divider} />
        <RightBlock />
      </Box>
    </Box>
  );
};

export default RegisterPage;
