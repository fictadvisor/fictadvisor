import { FC, useState } from 'react';
import { Box } from '@mui/material';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import Progress from '@/components/common/ui/progress-mui';
import { PersonalForm } from '@/components/pages/contract-page/components/personal-form/PersonalForm';

import * as styles from './ContractPage.styles';

const ContractPage: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        {isLoading ? (
          <Progress />
        ) : (
          <PersonalForm setIsLoading={setIsLoading} />
        )}
      </Box>
    </Box>
  );
};
export default ContractPage;
