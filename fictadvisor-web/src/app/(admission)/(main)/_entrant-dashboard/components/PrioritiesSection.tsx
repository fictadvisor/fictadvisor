import React, { FC } from 'react';
import { Actions, PriorityState } from '@fictadvisor/utils/enums';
import { EntrantFullResponse } from '@fictadvisor/utils/responses';
import { Box, Typography } from '@mui/material';

import * as styles from '@/app/(admission)/(main)/_entrant-dashboard/EntrantDashboardPage.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import { useToastError } from '@/hooks/use-toast-error/useToastError';
import ContractAPI from '@/lib/api/contract/ContractAPI';

interface PrioritiesSectionProps {
  data: EntrantFullResponse;
  setEntrantData: React.Dispatch<
    React.SetStateAction<EntrantFullResponse | null>
  >;
  cb: (action: Actions) => Promise<void>;
}

const educationProgramMapper: Record<string, string> = {
  CSSE: "Інженерія програмного забезпечення комп'ютерних систем",
  ISSE: 'Інженерія програмного забезпечення інформаційних систем',
  ISRS: 'Інформаційне забезпечення робототехнічних систем',
  IIS: 'Інтегровані інформаційні системи',
  IMST: 'Інформаційні управляючі системи та технології',
};

const errorMapper = {
  InvalidBodyException: 'Неправильно введені дані',
  DataNotFoundException: 'Даних не було знайдено',
  UnauthorizedException: 'Ти не зареєстрований',
  NoPermissionException: 'У тебе не має доступу до цього ресурсу',
};
export const PrioritiesSection: FC<PrioritiesSectionProps> = ({
  data,
  cb,
  setEntrantData,
}) => {
  const { displayError } = useToastError();
  const handleDelete = async () => {
    try {
      await cb(Actions.PRIORITY);
      setEntrantData(pr => {
        const newData = {
          ...pr,
          priority: undefined,
        };
        return newData as unknown as EntrantFullResponse;
      });
    } catch (e) {}
  };

  const handleApprove = async () => {
    try {
      await ContractAPI.approvePriorityById(data.id);

      setEntrantData(pr => {
        const newData = {
          ...pr,
          priority: { ...pr?.priority, state: PriorityState.APPROVED },
        };
        return newData as EntrantFullResponse;
      });
    } catch (error) {
      displayError(error);
    }
  };

  const priorities = data.priority
    ? Object.values(data.priority?.priorities)
    : [];

  return (
    <Box sx={styles.block}>
      <Divider
        textAlign={DividerTextAlign.LEFT}
        text="Пріоритети вступника"
        sx={styles.divider}
      />
      {priorities.map((value, index) => (
        <Typography variant={'body2Medium'} key={index}>
          {index + 1}. {educationProgramMapper[value]}
        </Typography>
      ))}
      {priorities.length !== 0 && (
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button
            size={ButtonSize.SMALL}
            type={'button'}
            text="Видалити"
            onClick={handleDelete}
            variant={ButtonVariant.OUTLINE}
            sx={{
              width: 'fit-content',
            }}
            disabled={data.priority?.state === PriorityState.APPROVED}
          />
          <Button
            size={ButtonSize.SMALL}
            type={'button'}
            text={
              data.priority?.state === PriorityState.APPROVED
                ? 'Схвалено'
                : 'Схвалити'
            }
            onClick={handleApprove}
            sx={{
              width: 'fit-content',
            }}
            disabled={data.priority?.state === PriorityState.APPROVED}
          />
        </Box>
      )}
      {priorities.length === 0 && (
        <Typography variant={'body2Medium'}>
          Дані про пріорітетки відсутні
        </Typography>
      )}
    </Box>
  );
};
