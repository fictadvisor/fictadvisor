import React from 'react';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { Typography } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import {
  ButtonColor,
  ButtonSize,
  ButtonVariant,
} from '@/components/common/ui/button-mui/types';

import * as sxStyles from './LoginFormBlockFooter.styles';

export const LoginFormBlockFooter = () => {
  return (
    <>
      <Typography sx={sxStyles.narrowScreenText}>Ти ще не з нами? </Typography>
      <Button
        text="Приєднатись!"
        size={ButtonSize.SMALL}
        color={ButtonColor.SECONDARY}
        variant={ButtonVariant.OUTLINE}
        sx={sxStyles.registerMobileButton}
        href="/register"
      />
      <Button
        sx={sxStyles.comebackButton}
        text="Повернутись на головну"
        startIcon={
          <ChevronLeftIcon style={{ width: '18px', height: '18px' }} />
        }
        variant={ButtonVariant.TEXT}
        size={ButtonSize.SMALL}
        href="/"
      />
    </>
  );
};
