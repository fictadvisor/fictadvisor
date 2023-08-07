import { EntrantFuIlResponse } from '@/lib/api/contract/types/EntrantFullResponse';
interface PrioritiesSectionProps {
  data: EntrantFuIlResponse;
}
import React, { FC } from 'react';
import { Box } from '@mui/material';

import Divider from '@/components/common/ui/divider';
import { DividerTextAlign } from '@/components/common/ui/divider/types';

export const PrioritiesSection: FC<PrioritiesSectionProps> = () => {
  const handleClick = async () => {};

  return (
    <Box>
      <Divider
        textAlign={DividerTextAlign.LEFT}
        text="Пріоритети освітніх програм"
      />
    </Box>
  );
};
