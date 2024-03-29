import { FC, ReactNode } from 'react';
import { Box, Tab as MuiTab, TabProps as MuiTabProps } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import { CustomLabel } from './components/CustomLabel';
import * as styles from './Tab.styles';
import { TabTextPosition } from './types';

interface TabProps extends Omit<MuiTabProps, 'icon'> {
  value?: string;
  label?: string | ReactNode;
  count?: number | null;
  icon?: ReactNode | string;
  textPosition?: TabTextPosition;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}
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
      {...rest}
      sx={mergeSx(styles.tab(count, textPosition, icon), sx)}
      label={<CustomLabel label={label} count={count} disabled={disabled} />}
      icon={<Box>{icon}</Box>}
      iconPosition="start"
      disabled={disabled}
    />
  );
};

export default Tab;
