import { FC, ReactNode } from 'react';
import { Box, ButtonBase } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import mergeSx from '@/lib/utils/MergeSxStylesUtil';

import { CustomLabel } from '../tab/components/CustomLabel';
import * as styles from '../tab/Tab.styles';
import { TabTextPosition } from '../tab/types';

interface NavTabProps {
  label?: string | ReactNode;
  count?: number | null;
  icon?: ReactNode;
  textPosition?: TabTextPosition;
  sx?: SxProps<Theme>;
}

// A presentational, tab-styled navigation item. Unlike the MUI-based `Tab`,
// this does NOT participate in a `Tabs`/`TabList` roving-tab-index context, so
// it can be rendered standalone (e.g. as drawer nav links) without triggering
// MUI v9's "RovingTabIndexContext is missing" error.
const NavTab: FC<NavTabProps> = ({
  label,
  count = null,
  icon,
  textPosition = TabTextPosition.CENTER,
  sx = {},
}) => {
  return (
    <ButtonBase
      sx={mergeSx(
        { display: 'flex', flexDirection: 'row' },
        styles.tab(count, textPosition, icon),
        sx,
      )}
    >
      {icon && <Box className="MuiTab-icon">{icon}</Box>}
      <CustomLabel label={label} count={count} disabled={false} />
    </ButtonBase>
  );
};

export default NavTab;
