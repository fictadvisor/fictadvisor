import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { Actions } from '@/lib/api/contract/types/DeleteEntrantDataBody';
import {
  EntrantFuIlResponse,
  priorityState,
} from '@/lib/api/contract/types/EntrantFullResponse';

import * as styles from '../EntrantDashboardPage.styles';
interface PersonalDataSectionProps {
  data: EntrantFuIlResponse;
  setEntrantData: React.Dispatch<
    React.SetStateAction<EntrantFuIlResponse | null>
  >;
  cb: (action: Actions) => Promise<void>;
}

const specialtyMapper = {
  '121': '121 Інженерія програмного забезпечення',
  '126': '126 Інформаційні системи та технології',
  '123': "123 Комп'ютерна інженерія",
};
export const PersonalDataSection: FC<PersonalDataSectionProps> = ({
  data,
  cb,
  setEntrantData,
}) => {
  const handleDelete = async () => {
    try {
      await cb(Actions.ENTRANT_DATA);
      setEntrantData(pr => {
        const newData = {
          ...pr,
          entrantData: undefined,
          representativeData: undefined,
          priority: undefined,
          contract: undefined,
        };
        return newData as EntrantFuIlResponse;
      });
    } catch (e) {}
  };

  return (
    <Box sx={styles.block}>
      <Divider
        textAlign={DividerTextAlign.LEFT}
        text="Вступник"
        sx={styles.divider}
      />
      <Typography variant={'h6Bold'}>{`${data.firstName} ${data.lastName} ${
        data.middleName ?? ''
      }`}</Typography>
      <Typography variant={'body2Medium'}>
        Спеціальність: {specialtyMapper[data.specialty]}
      </Typography>
      <Typography variant={'body2Medium'}>
        Форма навчання: {data.studyForm + ', ' + data.studyType}
      </Typography>
      <Typography variant={'body2Medium'}>
        Тип оплати: {data.paymentType}
      </Typography>
      <Typography variant={'body2Medium'}>
        Конкурсний бал: {data.competitivePoint}
      </Typography>
      <Button
        size={ButtonSize.SMALL}
        type={'button'}
        text="Видалити"
        onClick={handleDelete}
        variant={ButtonVariant.OUTLINE}
        sx={{
          width: 'fit-content',
        }}
        disabled={
          data?.priority?.state === priorityState.APPROVED || !!data?.contract
        }
      />
    </Box>
  );
};
