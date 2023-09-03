import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/system';

import { FieldState } from '@/components/common/ui/form/common/types';
import * as styles from '@/components/common/ui/form/dropdown/Dropdown.styles';
import { inputHeight } from '@/components/common/ui/form/dropdown/Dropdown.styles';

export const input = () => {
  return {
    ...styles.input(FieldState.DEFAULT),
    '& .MuiInputLabel-shrink': {
      paddingRight: '0px',
      borderColor: 'backgroundDark.200',
    },
    '& .MuiInputBase-root': {
      height: inputHeight['small'],
      display: 'flex',
      alignContent: 'center',
      paddingRight: '30px',
      '& .MuiInputAdornment-root:not(:has(svg))': {
        display: 'none',
      },
    },
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'backgroundDark.200',
      color: 'grey.600',
      paddingLeft: '16px',
      '&:hover': {
        '& fieldset': {
          borderColor: 'backgroundDark.200',
        },
      },
      '&.Mui-focused, &:hover &.Mui-focused': {
        '& fieldset': {
          borderColor: 'backgroundDark.200',
        },
      },
    },
    '& .MuiOutlinedInput-notchedOutline,& .Mui-disabled .MuiOutlinedInput-notchedOutline':
      {
        borderColor: 'backgroundDark.200',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderRadius: '8px',
      },
  } as SxProps<Theme>;
};
export const dropdown: SxProps<Theme> = {
  minWidth: '100px',
  width: '100%',
  p: 0,
  '& .MuiAutocomplete-popper': {
    top: '8px !important',
    '& ul': {
      borderColor: 'backgroundDark.200',
      border: '2px solid',
      borderRadius: '8px',
    },
    '& .MuiPaper-root': {
      borderRadius: '8px',
      backgroundColor: 'backgroundDark.200',

      '& .MuiAutocomplete-noOptions': {
        border: '2px solid',
        borderColor: 'backgroundDark.200',
        borderRadius: '8px',
        color: 'grey.400',
      },
    },
    '& .MuiAutocomplete-listbox': {
      minHeight: 'min-content',
      maxHeight: '160px',
      color: 'backgroundDark.200',
      borderRadius: '8px',
      gap: '0px',
      '&::-webkit-scrollbar': {
        width: '11.5px',
        '&-thumb': {
          border: '5px solid transparent',
          backgroundClip: 'content-box',
        },
      },

      '& .MuiAutocomplete-option': {
        color: 'white.main',
        minHeight: '36px',
        pt: '0px',
        pb: '0px',
        '&[aria-selected="true"],&.Mui-focused, &:hover': {
          backgroundColor: 'grey.200',
        },
      },
    },
  },
};
