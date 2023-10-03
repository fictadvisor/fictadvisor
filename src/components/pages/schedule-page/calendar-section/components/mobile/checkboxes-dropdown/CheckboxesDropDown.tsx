import React, { SyntheticEvent, useMemo } from 'react';
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
import { CheckboxOption } from '@/components/pages/schedule-page/calendar-section/components/mobile/checkboxes-dropdown/types/CheckboxOption';
import useAuthentication from '@/hooks/use-authentication';
import MergeSx from '@/lib/utils/MergeSxStylesUtil';
import { Checkboxes, useSchedule } from '@/store/schedule/useSchedule';

import {
  CheckBoxColorMapper,
  NegativeCheckboxes,
  TagColorMapper,
  TagLabelMapper,
} from './constants/CheckboxConstants';
import * as styles from './CheckboxesDropDown.styles';

export const CheckboxesDropdown = () => {
  const { user } = useAuthentication();

  const { checkboxes, updateCheckboxes, groupId } = useSchedule(state => ({
    checkboxes: state.checkboxes,
    updateCheckboxes: state.updateCheckboxes,
    groupId: state.groupId,
  }));

  const options = useMemo(
    () =>
      Object.entries(checkboxes)
        .map(([key, value]) => ({
          label: TagLabelMapper[key],
          value: key,
          checked: value,
        }))
        .filter(({ value }) => {
          return !user || user.group?.id !== groupId
            ? value !== 'isSelective' && value !== 'otherEvents'
            : true;
        }),
    [checkboxes, user, groupId],
  );

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
    <Box sx={styles.wrapper}>
      <Box sx={MergeSx(dropdownStyles.dropdown, styles.inputLabel)}>
        <Autocomplete
          disableCloseOnSelect
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
              label={'Оберіть фільтри'}
              sx={MergeSx(
                dropdownStyles.input(FieldState.DEFAULT, FieldSize.MEDIUM),
                styles.input,
              )}
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
          limitTags={2}
        />
      </Box>
    </Box>
  );
};
