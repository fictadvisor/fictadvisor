import React, { FC } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';

import Checkbox from '@/components/common/ui/form/checkbox';
import { FieldSize } from '@/components/common/ui/form/common/types';
import MergeSx from '@/lib/utils/MergeSxStylesUtil';

import { CheckboxesDropdownProps } from './types/CheckboxesDropdown';
import * as styles from './CheckboxesDropdown.styles';

const CheckboxesDropdown: FC<CheckboxesDropdownProps> = ({
  values,
  selected,
  size = FieldSize.SMALL,
  label = '',
  width = 150,
  handleChange,
  dropdownSx = {},
  menuSx = {},
  ...props
}) => {
  const selectedValues = selected.map(subject => subject.value) as string[];

  return (
    <FormControl sx={styles.formControl}>
      <InputLabel sx={styles.label}>{label}</InputLabel>
      <Select
        sx={MergeSx(styles.select, dropdownSx)}
        multiple
        // @ts-expect-error MUI type is not support arrays
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput sx={styles.input} />}
        renderValue={checked => {
          const selectedSubjects = values.filter(option =>
            checked.includes(option.value),
          );
          return selectedSubjects.map(option => option.label).join(', ');
        }}
        MenuProps={{
          PaperProps: { sx: MergeSx(styles.paperProps(width), menuSx) },
        }}
        SelectDisplayProps={{
          style: styles.selectedItems(size, width),
        }}
        IconComponent={props => (
          <ChevronDownIcon
            {...props}
            width={24}
            height={24}
            strokeWidth={1.5}
            fill="white"
            style={{ top: '10px', right: '15px', zIndex: '2' }}
          />
        )}
        {...props}
      >
        {values.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            <Checkbox
              checked={selectedValues.includes(option.value)}
              label={option.label}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CheckboxesDropdown;
