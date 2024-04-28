import React, { FC } from 'react';
import { Actions } from '@fictadvisor/utils/enums';
import { EntrantFullResponse } from '@fictadvisor/utils/responses';
import { Box, Typography } from '@mui/material';

import ContractApproveForm from '@/app/(admission)/(main)/_entrant-dashboard/components/entrant-approve-form/ContractApproveForm';
import * as styles from '@/app/(admission)/(main)/_entrant-dashboard/EntrantDashboardPage.styles';
import Button from '@/components/common/ui/button-mui';
import {
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';
import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';

interface ContractDetailsSectionProps {
  data: EntrantFullResponse;
  setEntrantData: React.Dispatch<
    React.SetStateAction<EntrantFullResponse | null>
  >;
  cb: (action: Actions) => Promise<void>;
}
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

        return newData as unknown as EntrantFullResponse;
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
              disabled={!!data.contract}
            />
          </Box>
        </>
      )}
      {!data.contract && (
        <ContractApproveForm data={data} setEntrantData={setEntrantData} />
      )}
    </Box>
  );
};
