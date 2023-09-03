import { FC, SyntheticEvent } from 'react';
import { useMemo, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Box, InputAdornment, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import {
  FieldSize,
  FieldState,
} from '@/components/common/ui/form/common/types';
import { popperProps } from '@/components/common/ui/form/dropdown/constants';

import Option from './components/option';
import * as styles from './Dropdown.styles';
import { DropDownOption, DropdownProps } from './types';

const Dropdown: FC<DropdownProps> = ({
  options,
  width,
  defaultRemark,
  label = 'АНУ ТИЦЬНУВ',
  placeholder = 'МОЛОДЧИНА! Тепер піди поспи солдат',
  noOptionsText = 'Опції відсутні',
  isSuccessOnDefault = false,
  showRemark = true,
  size = FieldSize.MEDIUM,
  isDisabled = false,
  disableClearable = false,
  onChange = () => {},
  onInputChange = () => {},
  value,
  touched,
  error,
  icon,
  hasPopup = true,
  inputSx,
  dropdownSx,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const dropdownState = useMemo(() => {
    if (isDisabled) return FieldState.DISABLED;
    else if (touched && error) return FieldState.ERROR;
    else if (touched && isSuccessOnDefault) return FieldState.SUCCESS;
    else return FieldState.DEFAULT;
  }, [touched, error, isSuccessOnDefault, isDisabled]);

  const handleChange = (_: SyntheticEvent, option: DropDownOption | null) => {
    onChange(option?.id || '');
  };

  const selectedValue: DropDownOption | null = useMemo(
    () => options.find(({ id }) => id === value) || null,
    [options, value],
  );

  return (
    <Box
      sx={{
        width: width || '100%',
      }}
    >
      <Box sx={dropdownSx ?? styles.dropdown}>
        <Autocomplete
          disableClearable={disableClearable}
          value={selectedValue}
          onChange={handleChange}
          disabled={isDisabled}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            onInputChange({
              target: { value: '' },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          fullWidth
          disablePortal
          blurOnSelect={true}
          options={options}
          renderInput={params => (
            <TextField
              {...params}
              label={label}
              sx={inputSx ?? styles.input(dropdownState, size)}
              placeholder={placeholder}
              disabled={isDisabled}
              onChange={onInputChange}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
              }}
            />
          )}
          getOptionLabel={value => {
            return 'text' in value ? value.text : value.label;
          }}
          componentsProps={{
            popper: popperProps,
          }}
          popupIcon={
            hasPopup && (
              <ChevronDownIcon width={24} height={24} strokeWidth={1.5} />
            )
          }
          noOptionsText={noOptionsText}
          renderOption={(props, option: DropDownOption) => (
            <Option {...props} option={option} />
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
