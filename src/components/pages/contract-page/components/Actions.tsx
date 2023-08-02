import React, { FC, useCallback } from 'react';
import { Box, useMediaQuery } from '@mui/material';

import Button from '@/components/common/ui/button-mui';
import { ButtonSize } from '@/components/common/ui/button-mui/types';
import * as styles from '@/components/pages/contract-page/components/personal-form/PersonalForm.styles';
import theme from '@/styles/theme';

interface ActionsProps {
  onPrevStep?: () => void;
  isFormValid: boolean;
  first?: boolean;
  last?: boolean;
}
export const Actions: FC<ActionsProps> = ({
  onPrevStep,
  isFormValid,
  first = false,
  last = false,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('tablet'));

  const NextButton = useCallback(
    ({ title = 'Далі' }: { title?: string }) => {
      return (
        <Button
          onClick={() => {
            window.scroll({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
          sx={styles.button}
          text={title}
          size={isMobile ? ButtonSize.SMALL : ButtonSize.MEDIUM}
          type="submit"
          disabled={!isFormValid}
        />
      );
    },
    [isFormValid],
  );

  const PrevButton = useCallback(() => {
    return (
      <Button
        sx={styles.button}
        onClick={() => {
          if (onPrevStep) onPrevStep();
          window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        }}
        size={isMobile ? ButtonSize.SMALL : ButtonSize.MEDIUM}
        text="Назад"
      />
    );
  }, []);

  return (
    <Box sx={styles.buttonPanel}>
      {first && <NextButton />}
      {last && (
        <>
          <PrevButton />
          <NextButton title={'Надіслати'} />
        </>
      )}
      {!first && !last && (
        <>
          <PrevButton />
          <NextButton />
        </>
      )}
    </Box>
  );
};
