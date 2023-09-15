import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { getPriorityName } from '@/components/pages/priority-approve-page/utils/getPriorityName';
import { getSpecialityName } from '@/components/pages/priority-approve-page/utils/getSpecialityName';
import useToast from '@/hooks/use-toast';
import contractAPI from '@/lib/api/contract/ContractAPI';

import * as styles from '../PriorityApprovePage.styles';

interface Priorities {
  1: string;
  2: string;
  3?: string;
}

interface EntrantPriorityPageProps {
  data: {
    firstName: string;
    middleName: string;
    lastName: string;
    priorities: Priorities;
    specialty: string;
    state: string;
  };
}

const TOAST_TIMER = 4000;

const EntrantPriorityPage: FC<EntrantPriorityPageProps> = ({ data }) => {
  const toast = useToast();
  const [buttonState, setButtonState] = useState(false);
  const [buttonText, setButtonText] = useState('Схвалити');

  useEffect(() => {
    if (data.state === 'NOT_APPROVED' || !buttonState) {
      setButtonState(false);
      setButtonText('Схвалити');
    }
  }, []);

  useEffect(() => {
    if (data.state === 'APPROVED') {
      setButtonText('Вже схвалено');
      setButtonState(true);
    }
  }, []);

  const handleClick = async () => {
    const body = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    };
    await contractAPI.entrantPriorityApprove(body);
    toast.success('Пріорітет схвалено', '', TOAST_TIMER);
    setButtonState(true);
    setButtonText('Вже схвалено');
  };
  return (
    <Box sx={styles.entrantInfo}>
      <Box>
        <Divider
          sx={styles.divider}
          textAlign={DividerTextAlign.LEFT}
          text="Дані про вступника"
        />
        <Typography sx={styles.nameAndSpeciality}>
          {data.lastName + ' ' + data.firstName + ' ' + data?.middleName}
        </Typography>
      </Box>
      <Box sx={styles.specialty}>
        <Divider
          sx={styles.divider}
          textAlign={DividerTextAlign.LEFT}
          text="Знайдені пріоритети"
        />
        <Typography sx={styles.nameAndSpeciality}>
          Спеціальність: {data.specialty} {getSpecialityName(data.specialty)}
        </Typography>
        <Typography sx={styles.priority}>
          1. {getPriorityName(data.priorities['1'])}
        </Typography>
        <Typography sx={styles.priority}>
          2. {getPriorityName(data.priorities['2'])}
        </Typography>
        {data.priorities['3'] && (
          <Typography sx={styles.priority}>
            3. {getPriorityName(data.priorities['3'])}
          </Typography>
        )}
        <Button
          sx={styles.button}
          text={buttonText}
          disabled={buttonState}
          onClick={handleClick}
        />
      </Box>
    </Box>
  );
};

export default EntrantPriorityPage;
