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

import Option from './components/option';
import * as styles from './Dropdown.styles';
import { DropDownOption, DropdownProps } from './types';

const Dropdown: FC<DropdownProps> = ({
  options,
  name = '',
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

  const handleChange = (_: SyntheticEvent, option: DropDownOption | null) => {
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
          // TODO: check why value is string
          isOptionEqualToValue={(option, value) => option.value === value.value}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              sx={styles.input(dropdownState, size)}
              placeholder={placeholder}
              disabled={isDisabled}
            />
          )}
          getOptionLabel={(input: DropDownOption | 'string') => {
            let value;
            if (typeof input === 'string') value = input;
            else if ('text' in input) value = input.text;
            else value = input.value;

            const foundOption: DropDownOption = options.find(opt => {
              if ('text' in opt) return opt.text === value;
              return opt.value === value;
            });

            if (!foundOption) return '';
            if ('text' in foundOption) return foundOption.text;
            return foundOption.label;
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
            <Option {...props} option={option} key={option.value} />
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

export default Dropdown;
