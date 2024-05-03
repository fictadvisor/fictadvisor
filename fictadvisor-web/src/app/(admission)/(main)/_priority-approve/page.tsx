'use client';

import React, { useState } from 'react';
import { Box } from '@mui/material';
import {
  expectedValues,
  initialValues,
} from 'src/app/(admission)/(main)/_priority-approve/constants';

import EntrantPriorityForm from '@/app/(admission)/(main)/_priority-approve/components/EntrantPriorityForm';
import EntrantPriorityPage from '@/app/(admission)/(main)/_priority-approve/components/EntrantPriorityPage';
import * as styles from '@/app/(admission)/(main)/_priority-approve/PriorityApprovePage.styles';
import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import contractAPI from '@/lib/api/contract/ContractAPI';
import { Fullname } from '@/types/contract';

const PriorityApprove = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(expectedValues);
  const { displayError } = useToastError();

  const handleChange = async (values: Fullname) => {
    try {
      const request = await contractAPI.getEntrantPriority(values);
      setData({ ...request });
      setStep(step + 1);
    } catch (error) {
      displayError(error);
    }
  };

  const steps = [
    <EntrantPriorityForm
      submit={handleChange}
      initValues={initialValues}
      key={1}
    />,
    <EntrantPriorityPage data={data} key={2} />,
  ];

  return (
    <Box sx={styles.page}>
      <Breadcrumbs
        sx={styles.breadcrumbs}
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Схвалення пріорітету', href: '/entrant-priority' },
        ]}
      />
      <Box sx={styles.form}>{steps[step]}</Box>
    </Box>
  );
};

export default PriorityApprove;
