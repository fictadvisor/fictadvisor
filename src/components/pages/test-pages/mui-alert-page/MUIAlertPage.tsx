import React from 'react';
import { Box } from '@mui/material';

import Alert from '@/components/common/ui/alert-mui';
import {
  AlertType,
  AlertVariantType,
} from '@/components/common/ui/alert-mui/Alert';

import * as styles from './MUIAlertPage.styles';

const colors: AlertType[] = ['info', 'success', 'warning', 'error'];
const variants: AlertVariantType[] = [
  'filled',
  'outlined',
  'darker',
  'border-top',
  'border-left',
];

const MUIAlertPage = () => {
  return (
    <Box sx={styles.wrapper}>
      {colors.map(color => (
        <>
          {variants.map(variant => (
            <Alert
              key={Math.random()}
              title="Testing inline alerts"
              description={
                Math.random() < 0.5 &&
                'Inline alerts are unclosable (check /test/popup-alert)'
              }
              type={color}
              variant={variant}
            />
          ))}
        </>
      ))}
    </Box>
  );
};

export default MUIAlertPage;
