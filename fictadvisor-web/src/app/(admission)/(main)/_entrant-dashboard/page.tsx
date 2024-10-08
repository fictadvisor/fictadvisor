'use client';

import React, { useState } from 'react';
import { Actions } from '@fictadvisor/utils/enums';
import { EntrantFullResponse } from '@fictadvisor/utils/responses';
import { Box, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';

import { ContractDetailsSection } from '@/app/(admission)/(main)/_entrant-dashboard/components/ContractDetailsSection';
import { ContractPersonalDetailsSection } from '@/app/(admission)/(main)/_entrant-dashboard/components/ContractPersonalDetailsSection';
import EntrantSearchForm from '@/app/(admission)/(main)/_entrant-dashboard/components/entrant-search-form/EntrantSearchForm';
import { PersonalDataSection } from '@/app/(admission)/(main)/_entrant-dashboard/components/PersonalDataSection';
import { PrioritiesSection } from '@/app/(admission)/(main)/_entrant-dashboard/components/PrioritiesSection';
import * as styles from '@/app/(admission)/(main)/_entrant-dashboard/EntrantDashboardPage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import { useAuthentication } from '@/hooks/use-authentication/useAuthentication';
import useToast from '@/hooks/use-toast';
import ContractAPI from '@/lib/api/contract/ContractAPI';

const errorMapper = {
  DataNotFoundException: 'Даних про вступника не було знайдено у базі даних',
  UnauthorizedException: 'Ти не зареєстрований',
  NoPermissionException: 'У тебе не має доступу до цього ресурсу',
};

const DeleteEntrantAdmin = () => {
  const [entrantData, setEntrantData] = useState<EntrantFullResponse | null>(
    null,
  );
  const { user } = useAuthentication();
  const router = useRouter();

  if (!user) router.push('/login');
  const toast = useToast();

  const handleDelete = async (action: Actions) => {
    if (!entrantData) return;

    try {
      await ContractAPI.deleteEntrantData(entrantData?.id, action);
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

export default DeleteEntrantAdmin;
