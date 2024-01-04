import { linearProgressClasses } from '@mui/material/LinearProgress';
import { SxProps, Theme } from '@mui/material/styles';

import getColor from '@/components/common/ui/line-graph/utils/get-color';

export const wrapper: SxProps<Theme> = {
  display: 'grid',
  alignItems: 'center',
  flexDirection: 'column',
};

export const label: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '14px',
  padding: '0 0 12px 6px',
  color: 'grey.800',
};

export const graph = (value: number): SxProps<Theme> => ({
  height: '7px',
  borderRadius: '5px',
  backgroundColor: 'backgroundDark.300',
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: '5px',
    backgroundColor: getColor(value),
  },
});
