import React, { ReactNode, useState } from 'react';
import Select from 'react-select';
import { useField } from 'formik';

import { FieldState } from '@/components/common/ui/form/common/types';

import styles from './Dropdown.module.scss';

const dropDownOptionHeight = 36; //px

interface DropDownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropDownOption[];
  label: string;
  name: string;
  isDisabled?: boolean;
  icon?: ReactNode;
  placeholder?: string;
  noOptionsText?: string;
  disabledPlaceholder?: string;
  numberOfOptions?: number;
  isSuccessOnDefault?: boolean;
  defaultRemark?: string;
  showRemark?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  label,
  name,
  isDisabled = false,
  icon,
  placeholder = isDisabled ? 'Недоступно...' : 'Тиць...',
  noOptionsText = 'Опції відсутні',
  numberOfOptions = 4,
  defaultRemark,
  isSuccessOnDefault = false,
  showRemark = true,
}) => {
  const [{}, { touched, error }, { setTouched, setValue }] = useField(name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let state;
  if (isDisabled) state = FieldState.DISABLED;
  else if (touched && error) state = FieldState.ERROR;
  else if (touched && isSuccessOnDefault) state = FieldState.SUCCESS;

  const handleChange = option => {
    setTouched(true);
    setValue(option.value);
  };

  return (
    <div className={styles['dropdown']}>
      <span className={state ? styles[`dropdown-${state}-label`] : ''}>
        {label}
      </span>
      {icon && <div className={styles['dropdown-icon-container']}>{icon}</div>}

      <Select
        instanceId={name}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        noOptionsMessage={() => noOptionsText}
        unstyled={true}
        options={options}
        openMenuOnClick={true}
        blurInputOnSelect={true}
        isDisabled={isDisabled}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        maxMenuHeight={dropDownOptionHeight * numberOfOptions}
        classNames={{
          control: () =>
            icon
              ? styles['dropdown-control'] +
                ' ' +
                styles['dropdown-control-iconed']
              : styles['dropdown-control'],
          container: () =>
            `${styles['dropdown-container']} ${
              styles[`dropdown-container-${state}`]
            }`,
          //   input: (state) => "dropdown-input",
          menu: () => styles['dropdown-menu'],
          menuList: () => styles['dropdown-menu-list'],
          option: state =>
            state.isSelected
              ? styles['dropdown-option'] +
                ' ' +
                styles['dropdown-option-selected']
              : styles['dropdown-option'],
          placeholder: state =>
            state.isDisabled
              ? styles['dropdown-placeholder-disabled']
              : state.isFocused
              ? styles['dropdown-placeholder-disabled']
              : styles['dropdown-placeholder'],

          singleValue: () => styles['dropdown-single-value'],
        }}
        styles={{
          control(baseStyles, state) {
            return {
              ...baseStyles,
              cursor: state.isDisabled ? 'not-allowed' : 'pointer',
            };
          },
          dropdownIndicator(baseStyles) {
            return {
              ...baseStyles,
              transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform .2s linear',
              cursor: 'pointer',
            };
          },
          container() {
            return {
              cursor: 'pointer',
            };
          },
        }}
      />
      {showRemark && (
        <p className={styles['remark-' + state]}>
          {touched && error ? error : defaultRemark}
        </p>
      )}
    </div>
  );
};

export default Dropdown;
