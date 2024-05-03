import { Box } from '@mui/material';
import { Metadata } from 'next';
import Image from 'next/image';

import LeftBlock from '@/app/(auth)/register/components/left-block';
import RightBlock from '@/app/(auth)/register/components/right-block';
import imgStyles from '@/app/(auth)/register/RegisterImage.module.scss';
import * as styles from '@/app/(auth)/register/RegisterPage.styles';
import Divider from '@/components/common/ui/divider';
import GroupAPI from '@/lib/api/group/GroupAPI';
import { GetAllGroupsResponse } from '@/lib/api/group/types/GetAllGroupsResponse';
import registerMetadata from '@/lib/metadata/register';
export const metadata: Metadata = registerMetadata;

export interface RegisterPageProps {
  data: GetAllGroupsResponse | null;
}

export default async function Register() {
  let data: RegisterPageProps['data'];
  try {
    data = await GroupAPI.getAll();
  } catch (error: unknown) {
    data = null;
  }
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
          <LeftBlock groups={data?.groups || []} />
          <Divider sx={styles.divider} />
          <RightBlock />
        </Box>
      </Box>
    </>
  );
}
