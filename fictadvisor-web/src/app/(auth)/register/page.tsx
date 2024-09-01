'use client';
import { PaginatedGroupsResponse } from '@fictadvisor/utils/responses';
import { Box } from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';

import LeftBlock from '@/app/(auth)/register/components/left-block';
import RightBlock from '@/app/(auth)/register/components/right-block';
import imgStyles from '@/app/(auth)/register/RegisterImage.module.scss';
import * as styles from '@/app/(auth)/register/RegisterPage.styles';
import Divider from '@/components/common/ui/divider';
import useToast from '@/hooks/use-toast';
import GroupAPI from '@/lib/api/group/GroupAPI';

export interface RegisterPageProps {
  data: PaginatedGroupsResponse | null;
}

export default function Register() {
  const router = useRouter();
  const toast = useToast();

  toast.warning(
    'Оновлення системи: Реєстрація тимчасово недоступна',
    'Наразі ми проводимо важливі оновлення, які триватимуть кілька днів. Дякуємо за терпіння!',
  );

  router.replace('/');

  return (
    <>
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
          {/* <LeftBlock groups={[]} />
          <Divider sx={styles.divider} />
          <RightBlock /> */}
        </Box>
      </Box>
    </>
  );
}
