import React, { useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';

import Breadcrumbs from '@/components/common/ui/breadcrumbs';
import EntrantPriorityForm from '@/components/pages/priority-approve-page/components/EntrantPriorityForm';
import EntrantPriorityPage from '@/components/pages/priority-approve-page/components/EntrantPriorityPage';
import {
  expectedValues,
  initialValues,
} from '@/components/pages/priority-approve-page/constants';
import * as styles from '@/components/pages/priority-approve-page/PriorityApprovePage.styles';
import { checkError } from '@/components/pages/priority-approve-page/utils/checkError';
import useToast from '@/hooks/use-toast';
import contractAPI from '@/lib/api/contract/ContractAPI';
import getErrorMessage from '@/lib/utils/getErrorMessage';
import { Fullname } from '@/types/contract';

const TOAST_TIMER = 4000;

const MyComponent = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(expectedValues);
  const toast = useToast();

  const handleChange = async (values: Fullname) => {
    try {
      const request = await contractAPI.getEntrantPriority(values);
      setData({ ...request });
      setStep(step + 1);
    } catch (error) {
      const message = getErrorMessage(error);
      message
        ? toast.error(message, '', TOAST_TIMER)
        : toast.error('Щось пішло не так, спробуй пізніше!');
      // if (axios.isAxiosError(e)) {
      //   const errorMessage = checkError(e.response?.data.error);
      //   if (errorMessage) {
      //     toast.error(errorMessage, '', TOAST_TIMER);
      //   }
      // }
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
