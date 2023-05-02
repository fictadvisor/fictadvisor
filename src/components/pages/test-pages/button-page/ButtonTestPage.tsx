import React from 'react';
import { StarIcon } from '@heroicons/react/24/outline';
import { Box } from '@mui/material';

import Button from '@/components/common/ui/button-mui';

import * as styles from './ButtonTestPage.styles';

const ButtonTestPage = () => {
  return (
    <Box sx={styles.wrapper}>
      <Button text="Button" size="large"></Button>
      <Button text="Button" size="large" startIcon={<StarIcon />}></Button>
      <Button text="Button" variant="outline" size="large"></Button>
      <Button text="Button" size="large" color="secondary"></Button>
      <Button
        text="Button"
        size="large"
        color="secondary"
        variant="outline"
        href="https://www.youtube.com/watch?v=t_Dt0E-KQH0"
      ></Button>
      <Button text="Button" size="large" disabled></Button>
      <Button text="Button" variant="outline" size="large" disabled></Button>
      <Button text="Button" size="large" color="secondary" disabled></Button>
      <Button
        text="Button"
        size="large"
        color="secondary"
        variant="outline"
        disabled
      ></Button>

      <Button text="Button" size="medium"></Button>
      <Button text="Button" size="small"></Button>
      <Button text="Button" size="large" variant="text"></Button>
      <Button text="Button" size="large" variant="text" disabled></Button>
    </Box>
  );
};

export default ButtonTestPage;
