import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

export const studentsGrid: SxProps<Theme> = {
  backgroundColor: 'backgroundDark.200',
  borderRadius: '6px',
  border: '1px solid',
  borderColor: 'grey.200',
  mb: '28px',
};
export const row: SxProps<Theme> = {
  p: '12px 16px',
  height: { mobile: '63px', desktop: '72px' },
  '&:not(&:last-child)': {
    borderBottom: '1px solid',
    borderColor: 'grey.200',
  },
  '& .MuiGrid-root.MuiGrid-item': {
    display: 'flex',
    alignItems: 'center',
    '&:nth-of-type(4)': {
      justifyContent: 'flex-end',
      gap: '8px',
    },
    '&:nth-of-type(1)': {
      pr: {
        mobile: '25px',
        desktop: '16px',
      },
      gap: {
        mobile: '8px',
        desktop: '16px',
      },
      '& .MuiAvatar-root': {
        width: { mobile: '36px', desktop: '48px' },
        height: { mobile: '36px', desktop: '48px' },
      },
      '& .MuiBox-root': {
        width: '100%',
      },
    },
  },
  '& .MuiTypography-root': {
    maxWidth: { mobile: '85%', desktop: 'unset' },
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    paddingRight: {
      mobile: '0',
      desktop: '24px',
    },
    '&.email': {
      typography: { mobile: 'overline', desktop: 'body2' },
      textTransform: 'none !important',
    },
    '&.name': {
      typography: { mobile: 'body1Bold', desktop: 'body2' },
    },
  },
};
