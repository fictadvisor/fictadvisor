import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import useToast from '@/hooks/use-toast';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import ContractAPI from '@/lib/api/contract/ContractAPI';
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

const errorMapper = {
  InvalidEntityIdException: 'Користувача з таким id не існує',
  DataNotFoundException: 'Даних не знайдено',
  NoPermissionException: 'У вас не має прав виконувати цю дію',
};

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
  const toast = useToast();
  const { displayError } = useToastError();
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
          lastName: 'NULL',
          firstName: 'NULL',
        };
        return newData as EntrantFuIlResponse;
      });
    } catch (e) {}
  };

  const createContract = async () => {
    try {
      await ContractAPI.createContractById(data.id);
      toast.info('Договір було надіслано на пошту', '', 3000);
    } catch (error) {
      displayError(error);
    }
  };

  const sendPriorityOnEmail = async () => {
    try {
      await ContractAPI.sendPriorityOnEmail(data.id);
      toast.info('Пріоритетку було надіслано на пошту', '', 3000);
    } catch (error) {
      displayError(error);
    }
  };

  return (
    <Box sx={styles.block}>
      <Divider
        textAlign={DividerTextAlign.LEFT}
        text="Вступник"
        sx={styles.divider}
      />
      <Typography variant={'h6Bold'}>{`${data.lastName} ${data.firstName} ${
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
      <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <Button
          size={ButtonSize.SMALL}
          type={'button'}
          text="Видалити"
          onClick={handleDelete}
          variant={ButtonVariant.FILLED}
          sx={{
            width: 'fit-content',
          }}
          disabled={
            data?.priority?.state === priorityState.APPROVED || !!data?.contract
          }
        />
        <Button
          size={ButtonSize.SMALL}
          type={'button'}
          text="Відправити договір на пошту"
          onClick={createContract}
          sx={{
            width: 'fit-content',
          }}
          variant={ButtonVariant.OUTLINE}
        />
        <Button
          variant={ButtonVariant.OUTLINE}
          size={ButtonSize.SMALL}
          type={'button'}
          text="Відправити пріоритетку на пошту"
          onClick={sendPriorityOnEmail}
          sx={{
            width: 'fit-content',
          }}
        />
      </Box>
    </Box>
  );
};
