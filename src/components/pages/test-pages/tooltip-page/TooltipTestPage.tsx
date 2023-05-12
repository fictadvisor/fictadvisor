import React from 'react';
import { Box, Button, List } from '@mui/material';

import Tooltip from '@/components/common/ui/tooltip-mui';

import * as styles from './TooltipTestPage.styles';

const TooltipTestPage = () => {
  return (
    <Box sx={styles.wrapper}>
      <List sx={styles.row}>
        <Box sx={styles.column}>
          <Tooltip text="Tooltip Example Bottom no arrow" hasArrow={false}>
            <Button>Tooltip Example Bottom no arrow</Button>
          </Tooltip>
          <Tooltip
            text="Tooltip Example Top no arrow"
            hasArrow={false}
            position="top"
          >
            <Button>Tooltip Example Top no arrow</Button>
          </Tooltip>
          <Tooltip
            text="Tooltip Example Right no arrow"
            hasArrow={false}
            position="right"
          >
            <Button>Tooltip Example Right no arrow</Button>
          </Tooltip>
          <Tooltip
            text="Tooltip Example Left no arrow"
            hasArrow={false}
            position="left"
          >
            <Button>Tooltip Example Left no arrow</Button>
          </Tooltip>
        </Box>
        <Box sx={styles.column}>
          <Tooltip text="Tooltip Example Bottom arrow">
            <Button>Tooltip Example Bottom arrow</Button>
          </Tooltip>
          <Tooltip text="Tooltip Example Top arrow" position="top">
            <Button>Tooltip Example Top arrow</Button>
          </Tooltip>
          <Tooltip text="Tooltip Example Right arrow" position="right">
            <Button>Tooltip Example Right arrow</Button>
          </Tooltip>
          <Tooltip text="Tooltip Example Left arrow" position="left">
            <Button>Tooltip Example Left arrow</Button>
          </Tooltip>
        </Box>
      </List>
    </Box>
  );
};

export default TooltipTestPage;
