import { FC } from 'react';
import { Box, Tab as MuiTab } from '@mui/material';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import { CustomLabel } from './components/CustomLabel';
import * as styles from './Tab.styles';
import { TabProps, TabTextPosition } from './types';

const Tab: FC<TabProps> = ({
  label,
  count = null,
  icon,
  textPosition = TabTextPosition.CENTER,
  disabled = false,
  sx = {},
  ...rest
}) => {
  return (
    <MuiTab
      sx={mergeSx(styles.tab(count, textPosition, icon), sx)}
      label={<CustomLabel label={label} count={count} disabled={disabled} />}
      icon={<Box>{icon}</Box>}
      iconPosition="start"
      disabled={disabled}
      {...rest}
    />
  );
};

export default Tab;
