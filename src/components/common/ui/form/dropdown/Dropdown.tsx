import { FC, SyntheticEvent } from 'react';
import { useMemo, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Box, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useField } from 'formik';

import {
  FieldSize,
  FieldState,
} from '@/components/common/ui/form/common/types';

import type { TagProps } from '../../tag-mui/Tag';

import * as styles from './Dropdown.styles';
import { Option } from './Option';

interface OptionBase {
  value: string;
}
interface DropDownTextOption extends OptionBase {
  label: string;
}

interface DropDownTagOption extends OptionBase, TagProps {}

export type DropDownOption = DropDownTagOption | DropDownTextOption;

interface DropdownProps {
  options: DropDownOption[];
  label?: string;
  name?: string;
  isDisabled?: boolean;
  placeholder?: string;
  isSuccessOnDefault?: boolean;
  defaultRemark?: string;
  showRemark?: boolean;
  size?: FieldSize;
  noOptionsText?: string;
  width?: string;
  onChange?: () => void;
  disableClearable?: boolean;
}

export const Dropdown: FC<DropdownProps> = ({
  options,
  name,
  width,
  onChange,
  defaultRemark,
  label = 'АНУ ТИЦЬНУВ',
  placeholder = 'МОЛОДЧИНА! Тепер піди поспи солдат',
  noOptionsText = 'Опції відсутні',
  isSuccessOnDefault = false,
  showRemark = true,
  size = FieldSize.MEDIUM,
  isDisabled = false,
  disableClearable = false,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [values, { touched, error }, { setTouched, setValue }] = useField(name);

  const dropdownState = useMemo(() => {
    if (isDisabled) return FieldState.DISABLED;
    else if (touched && error) return FieldState.ERROR;
    else if (touched && isSuccessOnDefault) return FieldState.SUCCESS;
    else return FieldState.DEFAULT;
  }, [touched, error, isSuccessOnDefault, isDisabled]);

  const handleChange = (_: SyntheticEvent, option: DropDownOption) => {
    setTouched(true);
    setValue(option?.value || '', true);
    if (onChange) onChange();
  };

  return (
    <Box
      sx={{
        width: width ? width : '100%',
      }}
    >
      <Box sx={styles.dropdown}>
        <Autocomplete
          disableClearable={disableClearable}
          value={values.value}
          onChange={handleChange}
          disabled={isDisabled}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          fullWidth
          disablePortal
          blurOnSelect={true}
          options={options}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={params => (
            <TextField
              inputProps={values}
              {...params}
              label={label}
              sx={styles.input(dropdownState, size)}
              placeholder={placeholder}
              disabled={isDisabled}
            />
          )}
          getOptionLabel={value => {
            const option = options.find(opt => opt.value === value);
            if (!option) return '';
            return 'text' in option ? option.text : option.label;
          }}
          componentsProps={{
            popper: {
              placement: 'bottom-start',
              modifiers: [
                { name: 'flip', enabled: false },
                {
                  name: 'preventOverflow',
                  options: {
                    mainAxis: false,
                  },
                },
                {
                  name: 'sameWidth',
                  enabled: true,
                  fn: ({ state }) => {
                    state.styles.popper.width = `${state.rects.reference.width}px`;
                  },
                  phase: 'beforeWrite',
                  requires: ['computeStyles'],
                },
              ],
            },
          }}
          popupIcon={
            <ChevronDownIcon width={24} height={24} strokeWidth={1.5} />
          }
          noOptionsText={noOptionsText}
          renderOption={(props, option: DropDownOption) => (
            <Option props={props} option={option} key={option.value} />
          )}
        />
        {showRemark && (
          <Typography sx={styles.remark(dropdownState, isFocused)} paragraph>
            {touched && error ? error : defaultRemark}
          </Typography>
        )}
      </Box>
    </Box>
  );
};
