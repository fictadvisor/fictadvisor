import { SxProps, Theme } from '@mui/material/styles';

import { TDiscipline } from '@/types/schedule';

const otherSubjects = (isPastEvent: boolean): SxProps<Theme> => ({
  backgroundColor: 'violet.100',
  borderColor: 'violet.700',
  '& .MuiTypography-body2': {
    typography: 'body1',
    color: 'violet.A100',
    opacity: 0.5,
  },
  '&:hover': {
    backgroundColor: 'violet.200',
    borderColor: 'violet.800',
  },
  '&:active': {
    backgroundColor: 'violet.300',
    borderColor: 'violet.900',
  },
  ...(isPastEvent && {
    backgroundColor: 'violet.50',
    borderColor: 'violet.300',
    '& .MuiTypography-body1': {
      ...trim4lines,
      color: 'grey.800',
      opacity: 0.5,
    },
    '& .MuiTypography-body2': {
      color: 'grey.600',
      opacity: 0.5,
    },
    '&:hover, &:active': {
      backgroundColor: 'violet.50',
      borderColor: 'violet.300',
      '& .MuiTypography-body1': {
        color: 'grey.600',
        opacity: 0.7,
        transition: 'linear all .2s',
      },
      '& .MuiTypography-body2': {
        color: 'grey.600',
        opacity: 0.7,
        transition: 'linear all .2s',
      },
    },
  }),
});

const trim4lines = {
  display: '-webkit-box',
  WebkitLineClamp: 4,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1.3,
};
const subjectColors = (
  disciplineType: TDiscipline | null,
  isPastEvent: boolean,
): SxProps<Theme> => ({
  '& .MuiTypography-body1': {
    color: 'grey.600',
    typography: 'body1Medium',
    ...trim4lines,
  },
  ...(disciplineType === 'LECTURE' && {
    backgroundColor: 'indigo.100',
    borderColor: 'indigo.700',
    '& .MuiTypography-body2': {
      typography: 'body1',
      color: 'indigo.A100',
      opacity: 0.5,
    },
    '&:hover': {
      backgroundColor: 'indigo.200',
      borderColor: 'indigo.800',
    },
    '&:active': {
      backgroundColor: 'indigo.300',
      borderColor: 'indigo.900',
    },
    ...(isPastEvent && {
      backgroundColor: 'indigo.100',
      borderColor: 'indigo.300',

      '& .MuiTypography-body1': {
        ...trim4lines,
        color: 'grey.800',
        opacity: 0.5,
        transition: 'linear all .2s',
      },
      '& .MuiTypography-body2': {
        color: 'grey.800',
        opacity: 0.5,
        transition: 'linear all .2s',
      },
      '&:hover, &:active': {
        backgroundColor: 'indigo.100',
        borderColor: 'indigo.300',
        '& .MuiTypography-body1': {
          color: 'grey.600',
          opacity: 0.7,
        },
        '& .MuiTypography-body2': {
          color: 'grey.600',
          opacity: 0.7,
        },
      },
    }),
  }),
  ...(disciplineType === 'PRACTICE' && {
    backgroundColor: 'orange.100',
    borderColor: 'orange.500',
    '& .MuiTypography-body2': {
      typography: 'body1',
      color: 'orange.A100',
      opacity: 0.5,
    },
    '&:hover': {
      backgroundColor: 'orange.200',
      borderColor: 'orange.600',
    },
    '&:active': {
      backgroundColor: 'orange.300',
      borderColor: 'orange.700',
    },
    ...(isPastEvent && {
      backgroundColor: 'orange.200',
      borderColor: 'orange.400',
      '& .MuiTypography-body1': {
        ...trim4lines,
        color: 'grey.800',
        opacity: 0.5,
        transition: 'linear all .2s',
      },
      '& .MuiTypography-body2': {
        color: 'grey.600',
        opacity: 0.5,
        transition: 'linear all .2s',
      },
      '&:hover, &:active': {
        backgroundColor: 'orange.200',
        borderColor: 'orange.400',
        '& .MuiTypography-body1': {
          color: 'grey.600',
          opacity: 0.7,
        },
        '& .MuiTypography-body2': {
          color: 'grey.600',
          opacity: 0.7,
        },
      },
    }),
  }),
  ...(disciplineType === 'LABORATORY' && {
    backgroundColor: 'mint.100',
    borderColor: 'mint.600',
    '& .MuiTypography-body2': {
      typography: 'body1',
      color: 'mint.A100',
      opacity: 0.5,
    },
    '&:hover': {
      backgroundColor: 'mint.200',
      borderColor: 'mint.800',
    },
    '&:active': {
      backgroundColor: 'mint.300',
      borderColor: 'mint.900',
    },
    ...(isPastEvent && {
      backgroundColor: 'mint.50',
      borderColor: 'mint.200',
      '& .MuiTypography-body1': {
        ...trim4lines,
        color: 'grey.800',
        opacity: 0.5,
        transition: 'linear all .2s',
      },
      '& .MuiTypography-body2': {
        color: 'grey.600',
        opacity: 0.5,
        transition: 'linear all .2s',
      },
      '&:hover, &:active': {
        backgroundColor: 'mint.50',
        borderColor: 'mint.200',
        '& .MuiTypography-body1': {
          color: 'grey.600',
          opacity: 0.7,
        },
        '& .MuiTypography-body2': {
          color: 'grey.600',
          opacity: 0.7,
        },
      },
    }),
  }),
  ...(disciplineType !== 'LABORATORY' &&
    disciplineType !== 'PRACTICE' &&
    disciplineType !== 'LECTURE' && {
      ...otherSubjects(isPastEvent),
    }),
});

export const wrapper: SxProps<Theme> = {
  height: {
    tablet: '137px',
    mobile: '80px',
  },
  width: {
    tablet: '129px',
    mobile: '100%',
  },

  position: 'relative',
  cursor: 'pointer',
};

export const card = (
  disciplineType: TDiscipline | null,
  height: string | number,
  minHeight = 'unset',
  isPastEvent: boolean,
): SxProps<Theme> => ({
  width: {
    tablet: '129px',
    mobile: '100%',
  },
  height: {
    tablet: height,
    mobile: '80px',
  },
  minHeight: minHeight,
  padding: '8px 8px 12px 8px',
  borderLeft: '8px solid',
  borderRadius: '6px',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  textAlign: 'start',
  textTransform: 'none',
  gap: '4px',
  wordBreak: 'break-all',
  outline: '2px solid',
  outlineColor: { mobile: 'transparent', tablet: '#1E1E1E' },
  overflow: 'hidden',

  ...subjectColors(disciplineType, isPastEvent),
});

export const packedCard = (
  top: number,
  width: number,
  left: number,
): SxProps<Theme> => ({
  position: 'absolute',
  top: { mobile: 0, tablet: top },
  left: { mobile: left, tablet: 0 },
  width: {
    tablet: '129px',
    mobile: `calc(100% - ${width}px)`,
  },
  outline: '2px solid',
  outlineColor: { mobile: 'transparent', tablet: '#1E1E1E' }, //It is backgroundDark.100, but MUI doesn\'t support theme colors for outlineColor
});

export const time: SxProps<Theme> = {
  typography: 'body1',
  width: '100%',
};
