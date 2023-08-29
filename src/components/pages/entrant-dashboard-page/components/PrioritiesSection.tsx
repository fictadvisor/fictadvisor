import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import * as styles from '@/components/pages/entrant-dashboard-page/EntrantDashboardPage.styles';
import useToast from '@/hooks/use-toast';
import ContractAPI from '@/lib/api/contract/ContractAPI';
import { Actions } from '@/lib/api/contract/types/DeleteEntrantDataBody';
import {
  EntrantFuIlResponse,
  priorityState,
} from '@/lib/api/contract/types/EntrantFullResponse';
import getErrorMessage from '@/lib/utils/getErrorMessage';

interface PrioritiesSectionProps {
  data: EntrantFuIlResponse;
  setEntrantData: React.Dispatch<
    React.SetStateAction<EntrantFuIlResponse | null>
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
  UnauthorizedException: 'Ви не зареєстровані',
  NoPermissionException: 'У вас не має доступу до цього ресурсу',
};
export const PrioritiesSection: FC<PrioritiesSectionProps> = ({
  data,
  cb,
  setEntrantData,
}) => {
  const toast = useToast();
  const handleDelete = async () => {
    try {
      await cb(Actions.PRIORITY);
      setEntrantData(pr => {
        const newData = {
          ...pr,
          priority: undefined,
        };
        return newData as EntrantFuIlResponse;
      });
    } catch (e) {}
  };

  const handleApprove = async () => {
    try {
      await ContractAPI.approvePriorityById(data.id);

      setEntrantData(pr => {
        const newData = {
          ...pr,
          priority: { ...pr?.priority, state: priorityState.APPROVED },
        };
        return newData as EntrantFuIlResponse;
      });
    } catch (error) {
      const message = getErrorMessage(error);
      message
        ? toast.error(message)
        : toast.error('Щось пішло не так, спробуй пізніше!');
      // const error = (
      //   e as { response: { data: { error: keyof typeof errorMapper } } }
      // ).response.data.error;
      //
      // toast.error(errorMapper[error]);
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
            disabled={data.priority?.state === priorityState.APPROVED}
          />
          <Button
            size={ButtonSize.SMALL}
            type={'button'}
            text={
              data.priority?.state === priorityState.APPROVED
                ? 'Схвалено'
                : 'Схвалити'
            }
            onClick={handleApprove}
            sx={{
              width: 'fit-content',
            }}
            disabled={data.priority?.state === priorityState.APPROVED}
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
