'use client';

import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { AutocompleteRenderInputParams, Box, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import {
  FieldSize,
  FieldState,
} from '@/components/common/ui/form/common/types';
import { popperProps } from '@/components/common/ui/form/dropdown/constants';
import * as dropdownStyles from '@/components/common/ui/form/dropdown/Dropdown.styles';
import MergeSx from '@/lib/utils/MergeSxStylesUtil';

import { CheckboxesDropdownProps } from './types/CheckboxesDropdown';
import * as styles from './CheckboxesDropdown.styles';

const CheckboxesDropdown = <T,>({
  size = FieldSize.MEDIUM,
  inputSx,
  dropdownSx,
  placeholder = '',
  ...props
}: CheckboxesDropdownProps<T>) => {
  return (
    <Box sx={styles.wrapper}>
      <Box
        sx={dropdownSx ?? MergeSx(dropdownStyles.dropdown, styles.inputLabel)}
      >
        <Autocomplete
          {...props}
          disableCloseOnSelect
          sx={styles.autocomplete}
          multiple
          fullWidth
          disablePortal
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              placeholder={placeholder}
              autoComplete="off"
              name="autocomplete"
              sx={
                inputSx ??
                MergeSx(
                  dropdownStyles.input(FieldState.DEFAULT, size),
                  styles.input,
                )
              }
            />
          )}
          popupIcon={
            <ChevronDownIcon width={24} height={24} strokeWidth={1.5} />
          }
          componentsProps={{
            popper: popperProps,
          }}
          limitTags={2}
        />
      </Box>
    </Box>
  );
};

export default CheckboxesDropdown;
