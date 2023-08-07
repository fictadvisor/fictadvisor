import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import { ContractDetailsSection } from '@/components/pages/entrant-admin-page/components/ContractDetailsSection';
import { ContractPersonalDetailsSection } from '@/components/pages/entrant-admin-page/components/ContractPersonalDetailsSection';
import { PersonalDataSection } from '@/components/pages/entrant-admin-page/components/PersonalDataSection';
import { PrioritiesSection } from '@/components/pages/entrant-admin-page/components/PrioritiesSection';
import * as styles from '@/components/pages/entrant-admin-page/EntrantAdminPage.styles';
import { EntrantFuIlResponse } from '@/lib/api/contract/types/EntrantFullResponse';

import EntrantSearchForm from './components/entrant-search-form/EntrantSearchForm';
const EntrantAdminPage = () => {
  const [entrantData, setEntrantData] = useState<EntrantFuIlResponse | null>(
    null,
  );

  return (
    <Box sx={styles.page}>
      <Breadcrumbs
        sx={styles.breadcrumbs}
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Менеджмент встуників', href: '/entrant-admin' },
        ]}
      />
      {!entrantData && <EntrantSearchForm setEntrantData={setEntrantData} />}
      {entrantData && (
        <Box sx={styles.container}>
          <Box sx={styles.leftBlock}>
            <PersonalDataSection data={entrantData} />
            <PrioritiesSection data={entrantData} />
            <ContractDetailsSection data={entrantData} />
          </Box>
          <Divider orientation="vertical" flexItem sx={styles.divider} />
          <Box sx={styles.rightBlock}>
            <ContractPersonalDetailsSection data={entrantData} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EntrantAdminPage;
