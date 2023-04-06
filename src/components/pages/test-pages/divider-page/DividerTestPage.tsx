import React from 'react';
import { Box, Typography } from '@mui/material';

import Divider from '@/components/common/ui/divider-mui';

import * as styles from './DividerTestPage.styles';

const DividerTestPage = () => {
  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  return (
    <Box sx={styles.wrapper}>
      <Typography>
        <h3>Divider page</h3>
        <Divider textAlign="left" text={'Hello (divider outside list)'} />
        <ul>
          <li>
            <p>{text}</p>
          </li>
          <Divider />
          <li>
            <p>{text}</p>
          </li>
          <Divider textAlign="left" text={'Hello'} />
          <li>
            <p>{text}</p>
          </li>
          <Divider textAlign="right" text={'Hello'} />
          <li>
            <p>{text}</p>
          </li>
          <Divider textAlign="center" text={'Hello'} />
          <li>
            <p>{text}</p>
          </li>
        </ul>
      </Typography>
    </Box>
  );
};

export default DividerTestPage;
