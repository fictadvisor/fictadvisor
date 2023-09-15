import React, { useMemo } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import Checkbox from '@/components/common/ui/form/checkbox/Checkbox';
import { CheckboxColor } from '@/components/common/ui/form/checkbox/types';
import {
  FieldSize,
  FieldState,
} from '@/components/common/ui/form/common/types';
import { popperProps } from '@/components/common/ui/form/dropdown/constants';
import * as styles from '@/components/common/ui/form/dropdown/Dropdown.styles';
import Tag from '@/components/common/ui/tag';
import { TagColor, TagSize } from '@/components/common/ui/tag/types';
import useAuthentication from '@/hooks/use-authentication';
import MergeSx from '@/lib/utils/MergeSxStylesUtil';
import { Checkboxes, useSchedule } from '@/store/schedule/useSchedule';

const NegativeCheckboxes: Record<string, boolean> = {
  addLecture: false,
  addLaboratory: false,
  addPractice: false,
  otherEvents: false,
  isSelective: false,
};

const TagLabelMapper: Record<string, string> = {
  addLecture: 'Лекція',
  addLaboratory: 'Лабораторна',
  addPractice: 'Практика',
  otherEvents: 'Інша події',
  isSelective: 'Вибіркові',
};

const TagColorMapper: Record<string, TagColor> = {
  addLecture: TagColor.INDIGO,
  addLaboratory: TagColor.MINT,
  addPractice: TagColor.ORANGE,
  otherEvents: TagColor.VIOLET,
  isSelective: TagColor.SECONDARY,
};

const CheckBoxColorMapper: Record<string, CheckboxColor> = {
  addLecture: CheckboxColor.LECTURE,
  addLaboratory: CheckboxColor.LAB,
  addPractice: CheckboxColor.PRACTICE,
  otherEvents: CheckboxColor.EVENT,
  isSelective: CheckboxColor.PRIMARY,
};

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
    [groupId, checkboxes],
  );

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={MergeSx(styles.dropdown, {
          '& .MuiInputLabel-shrink': { transform: '' },
        })}
      >
        <Autocomplete
          disableCloseOnSelect
          onChange={async (event, value, reason, details) => {
            const selectedCheckboxes = Object.fromEntries(
              value.map(option => [option.value, true]),
            );
            const newValues = {
              ...NegativeCheckboxes,
              ...selectedCheckboxes,
            } as Checkboxes;

            updateCheckboxes(newValues);
          }}
          options={options}
          value={options.filter(opt => opt.checked)}
          isOptionEqualToValue={(option, value) => {
            return option.value === value.value;
          }}
          multiple
          fullWidth
          disablePortal
          renderInput={params => (
            <TextField
              {...params}
              label={'Оберіть фільтри'}
              sx={MergeSx(styles.input(FieldState.DEFAULT, FieldSize.MEDIUM), {
                '& .MuiInputBase-root': {
                  height: 'unset',
                  WebkitTransform: 'unset',
                },
                '& .MuiFormLabel-root.MuiInputLabel-root': {
                  top: 0,
                },
              })}
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
          renderTags={(value, getTagProps, ownerState) => {
            return value.map((option, index) => {
              return (
                <Tag
                  text={option.label}
                  {...getTagProps({ index })}
                  key={index}
                  size={TagSize.SMALL}
                  sx={{ mr: '6px' }}
                  color={TagColorMapper[option.value]}
                />
              );
            });
          }}
          limitTags={2}
        />
      </Box>
    </Box>
  );
};
