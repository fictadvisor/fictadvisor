import { SxProps, Theme } from '@mui/material/styles';

// One height for every control on these pages, so a field and the button next
// to it line up instead of missing each other by a couple of pixels.
const CONTROL_HEIGHT = '40px';

// MUI's own palette mode is light, so its components come up with black text on
// this dark panel. The project's palette is inverted — grey.800 is the
// near-white end — and the shared inputs set their colours by hand for exactly
// this reason, so do the same for the plain MUI ones used here.
export const page: SxProps<Theme> = {
  '& .MuiInputBase-root': {
    height: CONTROL_HEIGHT,
  },
  '& .MuiInputBase-input': {
    color: 'grey.800',
  },
  '& .MuiInputBase-input::placeholder': {
    color: 'grey.500',
    opacity: 1,
  },
  '& .MuiInputLabel-root': {
    color: 'grey.500',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'grey.300',
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'grey.400',
  },
  '& .MuiSelect-icon': {
    color: 'grey.500',
  },
  '& .MuiTableCell-root': {
    color: 'grey.800',
    borderColor: 'grey.200',
  },
  // The date and time pickers are native browser widgets: without this they
  // paint their own light-mode text and calendar glyph over the dark field.
  '& input': {
    colorScheme: 'dark',
  },
};

export const header: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 16px 0 16px',
};

export const title: SxProps<Theme> = {
  borderBottom: '1px solid',
  borderColor: 'backgroundDark.400',
  padding: '16px',
  width: '60%',
};

export const section: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
};

export const sectionTitle: SxProps<Theme> = {
  color: 'grey.600',
};

export const controls: SxProps<Theme> = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '12px',
};

export const field: SxProps<Theme> = {
  minWidth: '160px',
};

export const table: SxProps<Theme> = {
  border: '1px solid',
  borderColor: 'backgroundDark.400',
  borderRadius: '8px',
  overflow: 'hidden',
};

export const empty: SxProps<Theme> = {
  padding: '16px',
  color: 'grey.600',
};

export const summary: SxProps<Theme> = {
  padding: '12px 16px',
  border: '1px solid',
  borderColor: 'backgroundDark.400',
  borderRadius: '8px',
  whiteSpace: 'pre-line',
};

// The shared Button stretches to 100% by default, which turns every action in a
// flex row or a table cell into a full-width slab. `fit-content` rather than a
// fixed width: the button paints its background over its box, so a label wider
// than the box (an icon plus text) spills out of the painted area.
// Select menus render in a portal, outside the page wrapper above, so they miss
// its overrides and would come up as MUI's default light paper.
export const selectSlotProps = {
  select: {
    MenuProps: {
      slotProps: {
        paper: {
          sx: {
            backgroundColor: 'backgroundDark.100',
            backgroundImage: 'none',
            border: '1px solid',
            borderColor: 'grey.200',
            '& .MuiMenuItem-root': {
              color: 'grey.800',
            },
            '& .MuiMenuItem-root:hover, & .MuiMenuItem-root.Mui-selected': {
              backgroundColor: 'backgroundDark.200',
            },
          },
        },
      },
    },
  },
};

export const actionButton: SxProps<Theme> = {
  width: 'fit-content',
  minWidth: '184px',
  height: CONTROL_HEIGHT,
};

export const rowButton: SxProps<Theme> = {
  width: 'fit-content',
  minWidth: '132px',
  height: CONTROL_HEIGHT,
};

export const fileName: SxProps<Theme> = {
  color: 'grey.600',
  maxWidth: '260px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
