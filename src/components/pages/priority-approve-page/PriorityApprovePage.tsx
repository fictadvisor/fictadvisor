import React, { useState } from 'react';
import { Box } from '@mui/material';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import EntrantPriorityForm from '@/components/pages/priority-approve-page/components/EntrantPriorityForm';
import EntrantPriorityPage from '@/components/pages/priority-approve-page/components/EntrantPriorityPage';
import {
  expectedValues,
  initialValues,
} from '@/components/pages/priority-approve-page/constants';
import * as styles from '@/components/pages/priority-approve-page/PriorityApprovePage.styles';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import contractAPI from '@/lib/api/contract/ContractAPI';
import { Fullname } from '@/types/contract';

const MyComponent = () => {
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

export default MyComponent;
