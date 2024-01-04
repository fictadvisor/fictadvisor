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
import { Actions } from '@/lib/api/contract/types/DeleteEntrantDataBody';
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

export const ContractPersonalDetailsSection: FC<
  ContractDetailsSectionProps
> = ({ data, cb, setEntrantData }) => {
  const handleDelete = async () => {
    try {
      await cb(Actions.ENTRANT);
      setEntrantData(pr => {
        const newData = {
          ...pr,
          entrantData: undefined,
          representativeData: undefined,
        };
        return newData as EntrantFuIlResponse;
      });
    } catch (e) {}
  };

  return (
    <>
      <Box sx={styles.block}>
        <Divider
          textAlign={DividerTextAlign.LEFT}
          text="Дані вступника"
          sx={styles.divider}
        />
        {data.entrantData ? (
          <>
            <Typography variant={'body2Medium'}>
              Номер телефону: {data.entrantData.phoneNumber}
            </Typography>
            <Typography variant={'body2Medium'}>
              Електронна пошта: {data.entrantData.email}
            </Typography>
            <Typography variant={'body2Medium'}>
              Номер паспорту:
              {(data.entrantData.passportSeries ?? '') +
                ' ' +
                data.entrantData.passportNumber}
            </Typography>
            <Typography variant={'body2Medium'}>
              Дата видачі:
              {data.entrantData.passportDate}
            </Typography>
            <Typography variant={'body2Medium'}>
              Орган видачі:
              {data.entrantData.passportInstitute}
            </Typography>
            <Typography variant={'body2Medium'}>
              Місце реєєстрації:
              {data.entrantData.address}
            </Typography>
          </>
        ) : (
          <Typography variant={'body2Medium'}>
            Дані про вступника відсутні
          </Typography>
        )}
      </Box>

      <Box sx={styles.block}>
        <Divider
          textAlign={DividerTextAlign.LEFT}
          text="Дані законного предствника"
          sx={styles.divider}
        />
        {data.representativeData ? (
          <>
            <Typography variant={'body2Medium'}>
              Номер телефону: {data.representativeData.phoneNumber}
            </Typography>
            <Typography variant={'body2Medium'}>
              Електронна пошта: {data.representativeData.email}
            </Typography>
            <Typography variant={'body2Medium'}>
              Номер паспорту:
              {(data.representativeData.passportSeries ?? '') +
                ' ' +
                data.representativeData.passportNumber}
            </Typography>
            <Typography variant={'body2Medium'}>
              Дата видачі:
              {data.representativeData.passportDate}
            </Typography>
            <Typography variant={'body2Medium'}>
              Орган видачі:
              {data.representativeData.passportInstitute}
            </Typography>
            <Typography variant={'body2Medium'}>
              Місце реєєстрації:
              {data.representativeData.address}
            </Typography>
          </>
        ) : (
          <Typography variant={'body2Medium'}>
            Дані про законного представника відсутні
          </Typography>
        )}
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
    </>
  );
};
