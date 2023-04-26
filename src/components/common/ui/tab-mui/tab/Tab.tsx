import React, { FC } from 'react';
import { Box, Tab as TabItem } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import { CustomLabel } from './components/CustomLabel';
import * as styles from './Tab.styles';
interface TabProps {
  value?: string;
  label?: string | React.ReactElement;
  count?: number | string;
  icon?: React.ReactElement | string;
  textPosition?: 'center' | 'left';
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

const Tab: FC<TabProps> = ({
  label,
  count,
  icon,
  textPosition = 'center',
  disabled = false,
  sx,
  ...rest
}) => {
  return (
    <TabItem
      sx={mergeSx(styles.tab(count, icon, textPosition), sx)}
      label={<CustomLabel label={label} count={count} disabled={disabled} />}
      icon={<Box>{icon}</Box>}
      iconPosition="start"
      disabled={disabled}
      {...rest}
    />
  );
};

export default Tab;
