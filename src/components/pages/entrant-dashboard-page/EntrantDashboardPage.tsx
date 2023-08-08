import React, { useState } from 'react';
import { Box, Divider } from '@mui/material';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import { ContractDetailsSection } from '@/components/pages/entrant-dashboard-page/components/ContractDetailsSection';
import { ContractPersonalDetailsSection } from '@/components/pages/entrant-dashboard-page/components/ContractPersonalDetailsSection';
import { PersonalDataSection } from '@/components/pages/entrant-dashboard-page/components/PersonalDataSection';
import { PrioritiesSection } from '@/components/pages/entrant-dashboard-page/components/PrioritiesSection';
import * as styles from '@/components/pages/entrant-dashboard-page/EntrantDashboardPage.styles';
import useToast from '@/hooks/use-toast';
import ContractAPI from '@/lib/api/contract/ContractAPI';
import { Actions } from '@/lib/api/contract/types/DeleteEntrantDataBody';
import { EntrantFuIlResponse } from '@/lib/api/contract/types/EntrantFullResponse';

import EntrantSearchForm from './components/entrant-search-form/EntrantSearchForm';
const errorMapper = {
  DataNotFoundException: 'Даних про вступника не було знайдено у базі даних',
  UnauthorizedException: 'Ви не зареєстровані',
  NoPermissionException: 'У вас не має доступу до цього ресурсу',
};
const EntrantDashboardPage = () => {
  const [entrantData, setEntrantData] = useState<EntrantFuIlResponse | null>(
    null,
  );

  const toast = useToast();

  const handleDelete = async (action: Actions) => {
    if (!entrantData) return;

    try {
      await ContractAPI.deleteEntrantData({
        entrantId: entrantData?.id,
        action,
      });
    } catch (e) {
      const error = (
        e as { response: { data: { error: keyof typeof errorMapper } } }
      ).response.data.error;

      toast.error(errorMapper[error]);
      //ці костилі треба, вір мені
      throw new Error();
    }
  };

  return (
    <Box sx={styles.page}>
      <Breadcrumbs
        sx={styles.breadcrumbs}
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Менеджмент встуників', href: '/entrant-dashboard' },
        ]}
      />
      {!entrantData && <EntrantSearchForm setEntrantData={setEntrantData} />}
      {entrantData && (
        <Box sx={styles.container}>
          <Box sx={styles.leftBlock}>
            <PersonalDataSection
              data={entrantData}
              cb={handleDelete}
              setEntrantData={setEntrantData}
            />
            <PrioritiesSection
              data={entrantData}
              cb={handleDelete}
              setEntrantData={setEntrantData}
            />
            <ContractDetailsSection
              data={entrantData}
              cb={handleDelete}
              setEntrantData={setEntrantData}
            />
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={styles.verticalDivider}
          />
          <Box sx={styles.rightBlock}>
            <ContractPersonalDetailsSection
              data={entrantData}
              cb={handleDelete}
              setEntrantData={setEntrantData}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EntrantDashboardPage;
