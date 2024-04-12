'use client';

import { useState } from 'react';
import { Box } from '@mui/material';

import { PersonalForm } from '@/app/(admission)/_contract/components/personal-form/PersonalForm';
import * as styles from '@/app/(admission)/_contract/ContractPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Progress from '@/components/common/ui/progress';

const ContractPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (isLoading) {
    return <Progress />;
  }

  return (
    <Box sx={styles.page}>
      <Breadcrumbs
        sx={styles.breadcrumbs}
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Договір про навчання', href: '/contract' },
        ]}
      />
      <Box sx={styles.form}>
        <PersonalForm setIsLoading={setIsLoading} />
      </Box>
    </Box>
  );
};
export default ContractPage;
