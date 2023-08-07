import { EntrantFuIlResponse } from '@/lib/api/contract/types/EntrantFullResponse';
interface ContractDetailsSectionProps {
  data: EntrantFuIlResponse;
}
import React, { FC } from 'react';
import { Box } from '@mui/material';

import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';

export const ContractPersonalDetailsSection: FC<
  ContractDetailsSectionProps
> = () => {
  const handleClick = async () => {};

  return (
    <Box>
      <Divider textAlign={DividerTextAlign.LEFT} text="Дані вступника" />
      <Divider
        textAlign={DividerTextAlign.LEFT}
        text="Дані законного предствника"
      />
    </Box>
  );
};
