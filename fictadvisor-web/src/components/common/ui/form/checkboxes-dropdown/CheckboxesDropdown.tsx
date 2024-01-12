'use client';

import React, { FC } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { AutocompleteRenderInputParams, Box, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import Checkbox from '@/components/common/ui/form/checkbox';
import {
  FieldSize,
  FieldState,
} from '@/components/common/ui/form/common/types';
import { popperProps } from '@/components/common/ui/form/dropdown/constants';
import * as dropdownStyles from '@/components/common/ui/form/dropdown/Dropdown.styles';
import MergeSx from '@/lib/utils/MergeSxStylesUtil';

import { CheckboxesDropdownProps } from './types/CheckboxesDropdown';
import * as styles from './CheckboxesDropdown.styles';

const CheckboxesDropdown: FC<CheckboxesDropdownProps> = ({
  size = FieldSize.SMALL,
  label = '',
  inputSx = {},
  dropdownSx = {},
  placeholder = '',
  ...props
}) => {
  return (
    <Box
      sx={MergeSx(
        dropdownSx,
        MergeSx(dropdownStyles.dropdown, styles.inputLabel),
      )}
    >
      <Autocomplete
        {...props}
        disableCloseOnSelect
        sx={styles.autocomplete}
        multiple
        disablePortal
        getOptionLabel={option => option.label}
        renderInput={(params: AutocompleteRenderInputParams) => (
          <TextField
            {...params}
            placeholder={placeholder}
            autoComplete="off"
            label={label}
            InputLabelProps={{ shrink: true }}
            name="autocomplete"
            sx={MergeSx(
              inputSx,
              MergeSx(
                dropdownStyles.input(FieldState.DEFAULT, size),
                styles.input,
              ),
            )}
          />
        )}
        renderOption={(props, option, { selected }) => {
          console.log(selected);
          return (
            <li {...props}>
              <Checkbox label={option.label} checked={selected} />
            </li>
          );
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Box {...getTagProps({ index })} key={index}>
              {option.value}
            </Box>
          ))
        }
        isOptionEqualToValue={(option, value) => option.label === value.label}
        popupIcon={<ChevronDownIcon width={24} height={24} strokeWidth={1.5} />}
        componentsProps={{
          popper: popperProps,
        }}
      />
    </Box>
  );
};

export default CheckboxesDropdown;
