import React from 'react';
import { Box } from '@mui/material';

import Button from '@/components/common/ui/button';
import useToast from '@/hooks/use-toast';

import * as styles from './MUIPopupAlertPage.styles';

const MUIAlertPage = () => {
  const toast = useToast();
  return (
    <Box sx={styles.wrapper}>
      <Button
        text={`Open error alert`}
        onClick={() => {
          toast.error(
            `Testing error popup`,
            'Popup alerts (toasts) are closable(check /test/alert)',
          );
        }}
      />
      <Button
        text={`Open info alert`}
        onClick={() => {
          toast.info(
            `Testing info popup`,
            'Popup alerts (toasts) are closable(check /test/alert)',
          );
        }}
      />
      <Button
        text={`Open warning alert`}
        onClick={() => {
          toast.warning(
            `Testing warning popup`,
            'Popup alerts (toasts) are closable(check /test/alert)',
          );
        }}
      />
      <Button
        text={`Open success alert`}
        onClick={() => {
          toast.success(
            `Testing success popup`,
            'Popup alerts (toasts) are closable(check /test/alert)',
          );
        }}
      />
    </Box>
  );
};

export default MUIAlertPage;
