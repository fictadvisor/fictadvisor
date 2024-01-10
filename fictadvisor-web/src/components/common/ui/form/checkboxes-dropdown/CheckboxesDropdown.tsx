import React, { FC, SyntheticEvent } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Checkbox from '@/components/common/ui/form/checkbox/Checkbox';
import {
  FieldSize,
  FieldState,
} from '@/components/common/ui/form/common/types';
import { popperProps } from '@/components/common/ui/form/dropdown/constants';
import * as dropdownStyles from '@/components/common/ui/form/dropdown/Dropdown.styles';
import Tag from '@/components/common/ui/tag';
import { TagSize } from '@/components/common/ui/tag/types';
import MergeSx from '@/lib/utils/MergeSxStylesUtil';
import { Checkboxes } from '@/store/schedule/useSchedule';

import {
  CheckBoxColorMapper,
  NegativeCheckboxes,
  TagColorMapper,
} from './constants/CheckboxConstants';
import { CheckboxesDropdownProps } from './types/CheckboxesDropdown';
import { CheckboxOption } from './types/CheckboxOption';
import * as styles from './CheckboxesDropdown.styles';

export const CheckboxesDropdown: FC<CheckboxesDropdownProps> = ({
  options,
  updateCheckboxes,
  placeholder = 'Обери фільтри',
  noOptionsText = 'Опції відсутні',
  size = FieldSize.MEDIUM,
  disableClearable = false,
  sx,
  inputSx,
  dropdownSx,
}) => {
  const handleChange = async (
    event: SyntheticEvent<Element, Event>,
    value: CheckboxOption[],
  ) => {
    const selectedCheckboxes = Object.fromEntries(
      value.map(option => [option.value, true]),
    );
    const newValues = {
      ...NegativeCheckboxes,
      ...selectedCheckboxes,
    } as Checkboxes;

    updateCheckboxes(newValues);
  };

  return (
    <Box sx={sx ?? styles.wrapper}>
      <Box
        sx={dropdownSx ?? MergeSx(dropdownStyles.dropdown, styles.inputLabel)}
      >
        <Autocomplete
          disableCloseOnSelect
          disableClearable={disableClearable}
          onChange={handleChange}
          options={options}
          value={options.filter(opt => opt.checked)}
          isOptionEqualToValue={(option, value) => {
            return option.value === value.value;
          }}
          sx={styles.autocomplete}
          multiple
          fullWidth
          disablePortal
          renderInput={params => (
            <TextField
              {...params}
              placeholder={placeholder}
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
          renderOption={(props, option, { selected }) => {
            return (
              <li {...props}>
                <Checkbox
                  checked={selected}
                  label={option.label}
                  color={CheckBoxColorMapper[option.value]}
                />
              </li>
            );
          }}
          getOptionLabel={value => value.label}
          componentsProps={{
            popper: popperProps,
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Tag
                text={option.label}
                {...getTagProps({ index })}
                key={index}
                size={TagSize.SMALL}
                sx={styles.tag}
                color={TagColorMapper[option.value]}
              />
            ))
          }
          noOptionsText={noOptionsText}
          limitTags={2}
        />
      </Box>
    </Box>
  );
};
