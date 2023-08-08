import {
  EntrantFuIlResponse,
  priorityState,
} from '@/lib/api/contract/types/EntrantFullResponse';
interface ContractDetailsSectionProps {
  data: EntrantFuIlResponse;
  setEntrantData: React.Dispatch<
    React.SetStateAction<EntrantFuIlResponse | null>
  >;
  cb: (action: Actions) => Promise<void>;
}
import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';
import ContractApproveForm from '@/components/pages/entrant-dashboard-page/components/entrant-approve-form/ContractApproveForm';
import * as styles from '@/components/pages/entrant-dashboard-page/EntrantDashboardPage.styles';
import { Actions } from '@/lib/api/contract/types/DeleteEntrantDataBody';
export const ContractDetailsSection: FC<ContractDetailsSectionProps> = ({
  data,
  cb,
  setEntrantData,
}) => {
  const handleDelete = async () => {
    try {
      await cb(Actions.CONTRACT);
      setEntrantData(pr => {
        const newData = {
          ...pr,
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
        text={!data?.contract ? 'Реєстрація договору' : 'Деталі договору'}
        sx={styles.divider}
      />
      {data.contract && (
        <>
          <Typography variant={'body2Medium'}>
            Номер договору: {data.contract?.number}
          </Typography>
          <Typography variant={'body2Medium'}>
            Дата заповнення: {data.contract?.date}
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
            disabled={!!data.contract}
          />
        </>
      )}
      {!data.contract && (
        <ContractApproveForm data={data} setEntrantData={setEntrantData} />
      )}
    </Box>
  );
};
